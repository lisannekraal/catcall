import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { GET_MODERATORS, CREATE_MODERATOR, REMOVE_MODERATOR } from '../../api/queries';
import { useForm } from 'react-hook-form';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Hidden, Tooltip } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Delete from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { v4 as uuidv4 } from 'uuid';


function AdminModeratorSettings({ authorized }) {

  const [moderators, setModerators] = useState([]);
  const { t } = useTranslation(['admin']);
  let { loading, error, data } = useQuery(GET_MODERATORS);
  const [createModerator] = useMutation(CREATE_MODERATOR, {
    refetchQueries: [{ query: GET_MODERATORS }]
  });
  const [removeModerator] = useMutation(REMOVE_MODERATOR, {
    refetchQueries: [{ query: GET_MODERATORS }]
  });

  const { handleSubmit } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    data && setModerators(data.getModerators);
  }, [data, moderators])

  async function deleteMod(mod) {
    await removeModerator({ variables: { id: mod._id } });
    let newModerators = [];
    const currentModerators = [...moderators];
    currentModerators.forEach((el) => {
      if (el._id !== mod._id) newModerators.push(el);
    });
    setModerators(newModerators);
  }

  const handleEmailInput = e => {
    setEmail(e.target.value);
  }

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  }

  const onSubmit = async (data) => {
    const variables = {
      email: email,
      password: password
    }
    document.getElementById('addModeratorForm').reset();
    await createModerator({ variables: { moderator: variables } });

    let newModerators = [...moderators];
    newModerators.push(variables);
    setModerators(newModerators);
  }

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Something went wrong...</p>
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <Hidden xsDown>
                <TableCell></TableCell>
              </Hidden>
              <TableCell><h4>Username</h4></TableCell>
              <TableCell><h4>{t('mod-settings.authorization', 'default')}</h4></TableCell>
              <TableCell><h4>{t('mod-settings.delete', 'default')}</h4></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moderators.map((moderator) => (
              <TableRow key={uuidv4()}>
                <Hidden xsDown>
                  <TableCell><AccountCircleIcon /></TableCell>
                </Hidden>
                <TableCell>{moderator.email}</TableCell>
                <TableCell>{moderator.canAdd ? 'Full' : 'Partial'}</TableCell>
                <TableCell>
                  {!moderator.canAdd ?
                    <Tooltip title={t('mod-settings.delete-help', 'default')} arrow>
                      <Delete style={{ cursor: 'pointer' }} onClick={() => deleteMod(moderator)} />
                    </Tooltip>
                    :
                    <Delete color="disabled" />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      { authorized &&
        <>
          <h3 style={{ margin: '19px', paddingTop: '20px' }}>{t('mod-settings.subtitle', 'default')}</h3>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{ color: 'rgb(245, 37, 89' }}
            >
              <Typography><GroupAddIcon /> {t('mod-settings.new', 'default')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form id="addModeratorForm" onSubmit={handleSubmit(onSubmit)}>
                <input name="email" style={{ padding: '10px 15px', marginRight: '10px' }} placeholder={t('mod-settings.username', 'default')} onChange={handleEmailInput} className="normal-font"></input>
                <input name="password" style={{ padding: '10px 15px', marginRight: '10px' }} placeholder={t('mod-settings.password', 'default')} onChange={handlePasswordInput} className="normal-font"></input>
                <input className="submit-button normal-font" type="submit" value={t('mod-settings.submit', 'default')} />
              </form>
            </AccordionDetails>
          </Accordion>
        </>
      }
    </>
  )
}

export default AdminModeratorSettings;
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MODERATORS, CREATE_MODERATOR, REMOVE_MODERATOR } from '../api/queries';
import { useForm } from 'react-hook-form';
import { Hidden, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Delete from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { v4 as uuidv4 } from 'uuid';


export default function ModeratorSettings({authorized}) {

  const [ moderators, setModerators ] = useState([]);
  let { loading, error, data } = useQuery(GET_MODERATORS);
  const [ createModerator ] = useMutation(CREATE_MODERATOR, {
    refetchQueries: [  {query: GET_MODERATORS} ]
  });
  const [ removeModerator ] = useMutation(REMOVE_MODERATOR, {
    refetchQueries: [  {query: GET_MODERATORS} ]
  });

  const { handleSubmit } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    data && setModerators(data.getModerators);
  }, [data, moderators])

  async function deleteMod(mod) {
    console.log(mod._id);
    await removeModerator({variables: {id: mod._id}});
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
    await createModerator({variables: {moderator: variables}});

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
                <TableCell><h4>Email Address</h4></TableCell>
                <TableCell><h4>Authorization</h4></TableCell>
                <TableCell><h4>Delete</h4></TableCell>
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
                    <Tooltip title="Permanently delete moderator" arrow>
                      <Delete style={{cursor: 'pointer'}} onClick={() => deleteMod(moderator)} />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
      { authorized &&
        <>
          <h3 style={{margin: '19px', paddingTop: '20px'}}>More</h3>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{color: 'rgb(245, 37, 89'}}
            >
              <Typography><GroupAddIcon /> Add new moderator</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form id="addModeratorForm" onSubmit={handleSubmit(onSubmit)}>
                  <input name="email" style={{padding: '10px 15px', marginRight: '10px'}} placeholder="Email address" onChange={handleEmailInput} className="normal-font"></input>
                  <input name="password" style={{padding: '10px 15px', marginRight: '10px'}} placeholder="password" onChange={handlePasswordInput} className="normal-font"></input>
                  <input className="submit-button normal-font" type="submit" value="Add" />
              </form>
            </AccordionDetails>
          </Accordion>
        </>
      }
    </>
  )
}
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useTranslation } from 'react-i18next';
import { GET_CATCALL } from '../../api/queries';

import { makeStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Star, StarOutline } from '@material-ui/icons';
import { v4 as uuidv4 } from 'uuid';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  greenButton: {
    background: 'rgb(90, 124, 56)',
    margin: 2,
    width: 68,
  },
  yellowButton: {
    background: 'rgb(196, 130, 31)',
    margin: 2,
    width: 68,
  },
  redButton: {
    background: 'rgb(161, 54, 81)',
    margin: 2,
    width: 68,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5
  }
});

function AdminTableRow({ tab, row, clickButtonUpdate, categoryLibrary }) {

  let history = useHistory();
  const { t } = useTranslation(['admin']);
  const [open, setOpen] = useState(false);
  const [buttonstoShow, setButtons] = useState([]);
  const [showQuote, setShowQuote] = useState(row.properties.quote);
  const [limitedQuote, setLimitedQuote] = useState(false);
  const [getCatcall, { loading, data }] = useLazyQuery(GET_CATCALL);
  const classes = useRowStyles();

  //for modal to add categorization
  const [openModal, setOpenModal] = useState(false);
  const [hideTooltips, setHideTooltips] = useState(false);
  const [statusCategory, setStatusCategory] = useState(
    Object.fromEntries(
      Object.keys(categoryLibrary).map(category => [category, false])
    )
  );

  useEffect(() => {
    if (row.properties.quote.length > 70 || row.properties.quote.split(' ')[0].length > 9) {
      setLimitedQuote(true);
      let partial;
      if (row.properties.quote.length > 70) partial = row.properties.quote.substring(0, 65);
      if (row.properties.quote.split(' ')[0].length > 7) partial = row.properties.quote.slice(0, 7);
      setShowQuote(partial + '...');
    }

    if (data) {
      history.push({
        pathname: '/catcalls/edit',
        search: tab === 'chalk' ? '?edit=url' : '?edit=text',
        state: { catcall: data.getCatcall }
      });
    }

    switch (tab) {
      case 'verify':
        setButtons([
          { name: t('table.actions.verify.green', 'default'), class: 'greenButton', tooltip: t('table.actions.verify.green-text', 'default') },
          { name: t('table.actions.verify.yellow', 'default'), class: 'yellowButton', tooltip: t('table.actions.verify.yellow-text', 'default') },
          { name: t('table.actions.verify.red', 'default'), class: 'redButton', tooltip: t('table.actions.verify.red-text', 'default') }
        ]);
        break;
      case 'chalk':
        setButtons([
          { name: t('table.actions.chalk.green', 'default'), class: 'greenButton', tooltip: t('table.actions.chalk.green-text', 'default') },
          { name: t('table.actions.chalk.red', 'default'), class: 'redButton', tooltip: t('table.actions.chalk.red-text', 'default') }
        ]);
        break;
      case 'database':
        setButtons([
          { name: t('table.actions.database.yellow', 'default'), class: 'yellowButton', tooltip: t('table.actions.database.yellow-text', 'default') },
          { name: t('table.actions.database.red', 'default'), class: 'redButton', tooltip: t('table.actions.database.red-text', 'default') }
        ]);
        break;
      case 'trash':
        setButtons([
          { name: t('table.actions.trash.green', 'default'), class: 'greenButton', tooltip: t('table.actions.trash.green-text', 'default') },
          { name: t('table.actions.trash.yellow', 'default'), class: 'yellowButton', tooltip: t('table.actions.trash.yellow-text', 'default') }
        ]);
        break;
      default:
        setButtons([{ name: t('table.actions.verify.green', 'default'), class: 'greenButton' }, { name: t('table.actions.verify.yellow', 'default'), class: 'yellowButton' }, { name: t('table.actions.verify.red', 'default'), class: 'redButton' }]);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, data])

  function verificationProcess() {
    let categoriesClicked = [];
    for (const key in statusCategory) {
      if (statusCategory[key]) categoriesClicked.push(key);
    }
    clickButtonUpdate({
      variables: {
        id: row._id,
        catcall: {
          properties: {
            verified: true,
            listedForChalk: true,
            categories: categoriesClicked
          }
        }
      }
    });
    setHideTooltips(false);
  }

  const handleClose = () => {
    setOpenModal(false);
    setHideTooltips(false);
  };

  const handleChange = (event) => {
    setStatusCategory({ ...statusCategory, [event.target.name]: event.target.checked });
  };

  function handleClick(button) {
    if (button.name === 'verify' || button.name === 'check') {
      setOpenModal(true);
      setHideTooltips(true);
    } else if (button.name === 'edit') {
      getCatcall({ variables: { id: row._id } });
    } else if (button.name === 'chalk' || button.name === 'krijt') {
      getCatcall({ variables: { id: row._id } });
    } else if (button.name === 'unstage' || button.name === 'later') {
      clickButtonUpdate({
        variables: {
          id: row._id,
          catcall: {
            properties: {
              listedForChalk: false
            }
          }
        }
      })
    } else if (button.name === 'delete') {
      clickButtonUpdate({
        variables: {
          id: row._id,
          catcall: {
            properties: {
              trash: true
            }
          }
        }
      })
    } else if (button.name === 'undo') {
      clickButtonUpdate({
        variables: {
          id: row._id,
          catcall: {
            properties: {
              trash: false
            }
          }
        }
      })
    }
  }

  function handleStarClick() {
    clickButtonUpdate({
      variables: {
        id: row._id,
        catcall: {
          properties: {
            starred: !row.properties.starred
          }
        }
      }
    });
  }

  if (loading) return <p>Loading ...</p>;
  return (
    <React.Fragment>


      <TableRow className={classes.root} >
        {/*1: expand functionality */}

        <TableCell style={{ padding: '5px' }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ?
              <KeyboardArrowUpIcon />
              :
              <Tooltip title="More info" arrow>
                <KeyboardArrowDownIcon />
              </Tooltip>
            }
          </IconButton>
        </TableCell>

        {/*2: star*/}
        <TableCell>
          {row.properties.starred ?
            <Tooltip title="Remove star" arrow>
              <Star onClick={() => handleStarClick()} />
            </Tooltip>
            :
            <Tooltip title="Add star" arrow>
              <StarOutline onClick={() => handleStarClick()} />
            </Tooltip>}
        </TableCell>

        {/*3: quote*/}
        <TableCell component="th" scope="row">
          "{showQuote}"
        </TableCell>

        {/*4: actions*/}
        <TableCell>
          {buttonstoShow.map((button) => (
            <Tooltip key={uuidv4()} title={hideTooltips ? "" : button.tooltip} arrow>
              <Button key={uuidv4()} variant="contained" color="inherit" size="small" onClick={() => handleClick(button)} className={classes[button.class]} >
                {button.name}
              </Button>
            </Tooltip>
          ))}
        </TableCell>
      </TableRow>

      {/* 2. expanded info */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                <span className="catcall-font">Info</span>
              </Typography>
              <Table size="small" aria-label="info">
                <TableBody>

                  {limitedQuote &&
                    <TableRow key={uuidv4()}>
                      <TableCell component="th" scope="row" style={{ width: 125 }} >
                        Full quote
                    </TableCell>
                      <TableCell>"{row.properties.quote}"</TableCell>
                    </TableRow>
                  }

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row" style={{ width: 125 }} >
                      Date added
                    </TableCell>
                    <TableCell>{(new Date(Number(row.properties.dateAdded))).toDateString()}</TableCell>
                  </TableRow>

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      Date catcall
                    </TableCell>
                    <TableCell>{row.properties.dateCatcall ? (new Date(Number(row.properties.dateCatcall))).toDateString() : "no date"}</TableCell>
                  </TableRow>

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      Location
                    </TableCell>
                    <TableCell>{`${row.geometry.coordinates[0].toFixed(3)}.. ${row.geometry.coordinates[1].toFixed(3)}..`}</TableCell>
                  </TableRow>

                  {row.properties.context &&
                    <TableRow key={uuidv4()}>
                      <TableCell component="th" scope="row">
                        Context
                      </TableCell>
                      <TableCell>{row.properties.context}</TableCell>
                    </TableRow>
                  }

                  {row.properties.categories.length > 0 &&
                    <TableRow key={uuidv4()}>
                      <TableCell component="th" scope="row">
                        Tags
                      </TableCell>
                      <TableCell>
                        {row.properties.categories.map((category) => (
                          <Button key={uuidv4()} variant="outlined" size="small" color="secondary" style={{ marginRight: '2px' }}>
                            {categoryLibrary[category]}
                          </Button>
                        ))}
                      </TableCell>
                    </TableRow>
                  }

                  {row.properties.url &&
                    <TableRow key={uuidv4()}>
                      <TableCell component="th" scope="row">
                        Chalk url
                      </TableCell>
                      <TableCell>
                        <a href={row.properties.url} target="_blank" rel="noreferrer">{`Image on Instagram`}</a>
                      </TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Dialog open={openModal} onClose={handleClose} aria-labelledby="form-dialog-categories">
        <DialogTitle id="form-dialog-categories">Do you wish to add categories for this catcall?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Categorization helps us analyze street harassment. No minimum or maximum number required.
          </DialogContentText>
          <FormGroup>
            {Object.keys(categoryLibrary).map((category) => (
              <FormControlLabel
                key={uuidv4()} control={<Checkbox checked={statusCategory[category]} onChange={handleChange} name={category} />}
                label={categoryLibrary[category]}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={verificationProcess} color="primary">Continue</Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}

export default React.memo(AdminTableRow);

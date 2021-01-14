import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_CATCALL } from '../api/queries';

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
});

function Row({ tab, row, clickButtonUpdate }) {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [buttonstoShow, setButtons] = useState([]);
  const [getCatcall, { loading, data }] = useLazyQuery(GET_CATCALL);
  const classes = useRowStyles();

  //for modal to add categorization
  const [openModal, setOpenModal] = useState(false);
  const [hideTooltips, setHideTooltips] = useState(false);
  const [state, setState] = useState({
    sexual: false,
    homophobia: false,
    transphobia: false,
    fatphobia: false,
    racism: false,
    fetishization: false,
    slutshaming: false,
    hateSpeech: false,
    young: false,
    assault: false,
    staring: false,
    following: false
  });
  const { sexual, homophobia, transphobia, fatphobia, racism, fetishization, slutshaming, hateSpeech, young, assault, staring, following } = state;

  useEffect(() => {
    //listen for a data change: when catcall queried, send to edit form, rendered for either url editing or text editing
    if (data) {
      history.push({
        pathname: '/catcalls/edit',
        search: tab === 'chalk' ? '?edit=url' : '?edit=text',
        state: { catcall: data.getCatcall }
      });
    }
    //listen for a tab change and re-set buttons
    switch (tab) {
      case 'unverified':
        setButtons([
          { name: 'verify', class: 'greenButton', tooltip: 'Agree to add submitted catcall to our database and map' },
          { name: 'edit', class: 'yellowButton', tooltip: 'Edit catcall content' },
          { name: 'delete', class: 'redButton', tooltip: 'Move submussion to trash' }
        ]);
        break;
      case 'chalk':
        setButtons([
          //Deactivated email functionality:
          // {name: 'email', class: 'greenButton', tooltip: ''},
          { name: 'chalk', class: 'greenButton', tooltip: 'Add Insta photo to map and remove catcall from this list' },
          { name: 'unstage', class: 'redButton', tooltip: 'Decide not to chalk this catcall for now' }
        ]);
        break;
      case 'database':
        setButtons([
          { name: 'edit', class: 'yellowButton', tooltip: 'Edit catcall content' },
          { name: 'delete', class: 'redButton', tooltip: 'Remove catcall to trash' }
        ]);
        break;
      case 'trash':
        setButtons([
          { name: 'undo', class: 'greenButton', tooltip: 'Move catcall back into database' },
          { name: 'edit', class: 'yellowButton', tooltip: 'Edit catcall content' }
        ]);
        break;
      default: //unverified
        setButtons([{ name: 'verify', class: 'greenButton' }, { name: 'edit', class: 'yellowButton' }, { name: 'delete', class: 'redButton' }]);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, data])

  function verificationProcess() {
    let categoriesClicked = [];
    for (const key in state) {
      if (state[key]) categoriesClicked.push(key);
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
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  function handleClick(button) {
    if (button.name === 'verify') {
      setOpenModal(true);
      setHideTooltips(true);
    } else if (button.name === 'edit') {
      getCatcall({ variables: { id: row._id } });
    } else if (button.name === 'email') {
      alert('Unfortunately this feature does not work just yet ;)');
    } else if (button.name === 'chalk') {
      getCatcall({ variables: { id: row._id } });
    } else if (button.name === 'unstage') {
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
        <TableCell>
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
          "{row.properties.quote}"
        </TableCell>

        {/*4: actions*/}
        <TableCell>
          {buttonstoShow.map((button) => (
            <Tooltip key={uuidv4()} title={hideTooltips ? "" : button.tooltip} arrow>
              <Button variant="contained" color="inherit" size="small" onClick={() => handleClick(button)} className={classes[button.class]} >
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

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      Date added
                    </TableCell>
                    <TableCell>{(new Date(Number(row.properties.dateAdded))).toDateString()}</TableCell>
                  </TableRow>

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      Date catcall
                    </TableCell>
                    <TableCell >{row.properties.dateCatcall ? (new Date(Number(row.properties.dateCatcall))).toDateString() : "no date"}</TableCell>
                  </TableRow>

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      Location
                    </TableCell>
                    <TableCell>{`${row.geometry.coordinates[0].toFixed(3)}.. ${row.geometry.coordinates[1].toFixed(3)}..`}</TableCell>
                  </TableRow>

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      Context
                    </TableCell>
                    <TableCell>{row.properties.context}</TableCell>
                  </TableRow>

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      Chalk url
                    </TableCell>
                    <TableCell>
                      <a href={row.properties.url} target="_blank" rel="noreferrer">{row.properties.url}</a>
                    </TableCell>
                  </TableRow>
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
            <FormControlLabel
              control={<Checkbox checked={sexual} onChange={handleChange} name="sexual" />}
              label="Sexual harassment"
            />
            <FormControlLabel
              control={<Checkbox checked={homophobia} onChange={handleChange} name="homophobia" />}
              label="Homophobia"
            />
            <FormControlLabel
              control={<Checkbox checked={transphobia} onChange={handleChange} name="transphobia" />}
              label="Transphobia"
            />
            <FormControlLabel
              control={<Checkbox checked={fatphobia} onChange={handleChange} name="fatphobia" />}
              label="Fatphobia"
            />
            <FormControlLabel
              control={<Checkbox checked={racism} onChange={handleChange} name="racism" />}
              label="Racism"
            />
            <FormControlLabel
              control={<Checkbox checked={fetishization} onChange={handleChange} name="fetishization" />}
              label="Fetishization"
            />
            <FormControlLabel
              control={<Checkbox checked={slutshaming} onChange={handleChange} name="slutshaming" />}
              label="Slutshaming"
            />
            <FormControlLabel
              control={<Checkbox checked={hateSpeech} onChange={handleChange} name="hateSpeech" />}
              label="Hate speech"
            />
            <FormControlLabel
              control={<Checkbox checked={young} onChange={handleChange} name="young" />}
              label="Young"
            />
            <FormControlLabel
              control={<Checkbox checked={assault} onChange={handleChange} name="assault" />}
              label="Assault"
            />
            <FormControlLabel
              control={<Checkbox checked={staring} onChange={handleChange} name="staring" />}
              label="Staring"
            />
            <FormControlLabel
              control={<Checkbox checked={following} onChange={handleChange} name="following" />}
              label="Following"
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={verificationProcess} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}

export default Row;

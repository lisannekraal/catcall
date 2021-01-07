import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { GET_CATCALL } from '../api/queries';

import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableRow, Box, Button, Collapse, IconButton, Typography } from '@material-ui/core';
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
  const [ getCatcall, { loading, data } ] = useLazyQuery(GET_CATCALL);
  const classes = useRowStyles();

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
        setButtons([{name: 'verify', class: 'greenButton'}, {name: 'edit', class: 'yellowButton'}, {name: 'delete', class: 'redButton'}]);
        break;
      case 'chalk':
        setButtons([{name: 'email', class: 'greenButton'}, {name: 'chalk', class: 'yellowButton'}, {name: 'unstage', class: 'redButton'}]);
        break;
      case 'database':
        setButtons([{name: 'edit', class: 'yellowButton'}, {name: 'delete', class: 'redButton'}]);
        break;
      case 'trash':
        setButtons([{name: 'undo', class: 'greenButton'}, {name: 'edit', class: 'yellowButton'}]);
        break;
      default: //unverified
        setButtons([{name: 'verify', class: 'greenButton'}, {name: 'edit', class: 'yellowButton'}, {name: 'delete', class: 'redButton'}]);
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, data])

  function handleClick(button) {
    if (button.name === 'verify') {
      clickButtonUpdate({ variables: {
          id: row._id,
          catcall: {
            properties: {
              verified: true,
              listedForChalk: true
            }
          }
        }
      });
    } else if (button.name === 'edit') {
      getCatcall({variables: {id: row._id}});
    } else if (button.name === 'email') {
      alert('Unfortunately this feature does not work just yet ;)');
    } else if (button.name === 'chalk') {
      getCatcall({variables: {id: row._id}});
    } else if (button.name === 'unstage') {
      clickButtonUpdate({ variables: {
          id: row._id,
          catcall: {
            properties: {
              listedForChalk: false
            }
          }
        }
      })
    } else if (button.name === 'delete') {
      clickButtonUpdate({ variables: {
          id: row._id,
          catcall: {
            properties: {
              trash: true
            }
          }
        }
      })
    } else if (button.name === 'undo') {
      clickButtonUpdate({ variables: {
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
    clickButtonUpdate({ variables: {
      id: row._id,
      catcall: {
        properties: {
          starred: !row.properties.starred
        }
      }
    }});
  }

  if (loading) return <p>Loading ...</p>;
  return (
    <React.Fragment>

      <TableRow className={classes.root} >
        {/*1: expand functionality */}
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {/*2: star*/}
        <TableCell>
          {row.properties.starred ?
          <Star onClick={() => handleStarClick()} />  :
          <StarOutline onClick={() => handleStarClick()} />}
        </TableCell>

        {/*3: quote*/}
        <TableCell component="th" scope="row">
          {row.properties.quote}
        </TableCell>

        {/*4: actions*/}
        <TableCell>
          {buttonstoShow.map((button) => (
            <Button key={uuidv4()} variant="contained" color="inherit" size="small" onClick={() => handleClick(button)} className={classes[button.class]} >
              {button.name}
            </Button>
          ))}
        </TableCell>
      </TableRow>

      {/* 2. expanded info */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Info
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

    </React.Fragment>
  );
}


export default Row;

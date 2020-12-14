import { useState, useEffect } from 'react';

import Row from './AdminTableRow';
import { GET_MODERATORS, CREATE_MODERATOR } from '../api/queries';
import { useQuery, useMutation } from '@apollo/client';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { useForm } from 'react-hook-form';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Hidden } from "@material-ui/core"
import Delete from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { v4 as uuidv4 } from 'uuid';


// Function labels data in the table
function processCatCallsData({ geometry, properties, _id, type }) {
  return {
    id: _id,
    catCallQuote: properties.quote,
    context: properties.context,
    dateAdded: (new Date(Number(properties.dateAdded))).toDateString(),
    dateCatcall: properties.dateCatcall ? (new Date(Number(properties.dateCatcall))).toDateString() : "no date",
    geometryType: geometry.type,
    type: type,
    coordinates: geometry.coordinates,
    verified: properties.verified,
    chalked: properties.chalked,
    listedForChalk: properties.listedForChalk,
    trash: properties.trash,
    url: properties.url,
  };
}

export default function AdminTable({ catcallData, updateCatcall, value }) {

  //table contains 
  //  - all the getCetcalls from database; 
  //  - updateCatcall mutation query; 
  //  - value (selected tab)
  const [showSettings, setShowSettings] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  let { loading, error, data } = useQuery(GET_MODERATORS);
  const [ moderators, setModerators ] = useState([]);
  const [ createModerator ] = useMutation(CREATE_MODERATOR);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rows, setRows] = useState(catcallData.map(catcall => processCatCallsData(catcall)))
  //rows is a list of all data in above format ----> might not be needed as it is taken care of by useEffect?

  useEffect(() => {
    let switchedRows;
    switch (value) {
      case 'unverified':
        setShowSettings(false);
        switchedRows = catcallData.filter(el => el.properties.trash === false && el.properties.verified === false);
        break;
      case 'chalk':
        setShowSettings(false);
        switchedRows = catcallData.filter(el => el.properties.trash === false && el.properties.verified === true && el.properties.chalked === false && el.properties.listedForChalk === true);
        break;
      case 'database':
        setShowSettings(false);
        switchedRows = catcallData.filter(el => el.properties.trash === false);
        break;
      case 'trash':
        setShowSettings(false);
        switchedRows = catcallData.filter(el => el.properties.trash === true);
        break;
      case 'settings':
        setModerators(data.getModerators);
        setShowSettings(true);
        break;
      default: //unverified
        switchedRows = catcallData.filter(el => el.properties.trash === false && el.properties.verified === false);
        break;
    }
    //filter data for the value(tab) and setRows
    switchedRows && setRows(switchedRows.map(catcall => processCatCallsData(catcall))); 
  }, [value]) //listens for a tab change

  const handleEmailInput = e => {
    setEmail(e.target.value);
  }

  const handlePasswordInput = e => {
    setPassword(e.target.value);
  }

  const clickButtonUpdate = ({ variables }) => {
    updateCatcall({ variables }); //update db, remove from list and reset rows
    let newRows = rows.filter(row => {
      return row.id !== variables.id
    })
    setRows(newRows);
  }

  const onSubmit = async (data) => {

    const variables = {
      email: email,
      password: password
    }
    document.getElementById('addModeratorForm').reset();
    console.log(variables);
    await createModerator({variables: {moderator: variables}});
    console.log('after await');

    let newModerators = [...moderators];
    newModerators.push(variables);
    setModerators(newModerators);
    console.log(moderators);
  }

  return (
    <>
    { showSettings ?
      <>
        {/* ModSettings table + addMod-form */}
        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <Hidden xsDown>
                    <TableCell></TableCell>
                  </Hidden>
                  <TableCell>Email adress</TableCell>
                  <TableCell>Authorization</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {moderators.map((moderator) => (
                  <TableRow>
                    <Hidden xsDown>
                      <TableCell><AccountCircleIcon /></TableCell>
                    </Hidden>
                    <TableCell>{moderator.email}</TableCell>
                    <TableCell>{moderator.canAdd ? 'Full' : 'Partial'}</TableCell>
                    <TableCell><Delete /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            style={{color: 'rgb(245, 37, 89'}}
          >
            <Typography><GroupAddIcon /> Add a new moderator</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form id="addModeratorForm" onSubmit={handleSubmit(onSubmit)}>
                <input name="email" style={{padding: '10px 15px', marginRight: '10px'}} placeholder="Email address" onChange={handleEmailInput}></input>
                <input name="password" style={{padding: '10px 15px', marginRight: '10px'}} placeholder="password" onChange={handlePasswordInput}></input>
                <input className="submit-button"  type="submit" value="Add" />
            </form>
          </AccordionDetails>
        </Accordion>
      </>
    : 
    
      <TableContainer component={Paper}>
        {/* generic dashboard table for all other functionalities */}
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Quote</TableCell>
              <TableCell align="center">Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={uuidv4()} tab={value} row={row} clickButtonUpdate={clickButtonUpdate} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
    </>


  )
}

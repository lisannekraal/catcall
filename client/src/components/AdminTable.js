import { useState, useEffect } from 'react';

import Row from './AdminTableRow';
import ModeratorSettings from './ModeratorSettings';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { v4 as uuidv4 } from 'uuid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WarningIcon from '@material-ui/icons/Warning';
import { useForm } from 'react-hook-form';


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

export default function AdminTable({ catcallData, updateCatcall, value, authorized, emptyTrash }) {

  const [showSettings, setShowSettings] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [emptyTableMessage, setEmptyTableMessage] = useState('No new catcalls to verify');
  const { handleSubmit } = useForm();

  const [rows, setRows] = useState(catcallData.map(catcall => processCatCallsData(catcall)))
  //rows is a list of all data in above format ----> might not be needed as it is taken care of by useEffect?

  useEffect(() => {
    let switchedRows;
    switch (value) {
      case 'unverified':
        setShowSettings(false);
        setShowTrash(false);
        setEmptyTableMessage('No new catcalls to verify');
        switchedRows = catcallData.filter(el => el.properties.trash === false && el.properties.verified === false);
        break;
      case 'chalk':
        setShowSettings(false);
        setShowTrash(false);
        setEmptyTableMessage('No catcalls on the list to chalk');
        switchedRows = catcallData.filter(el => el.properties.trash === false && el.properties.verified === true && el.properties.chalked === false && el.properties.listedForChalk === true);
        break;
      case 'database':
        setShowSettings(false);
        setShowTrash(false);
        setEmptyTableMessage('Database is empty');
        switchedRows = catcallData.filter(el => el.properties.trash === false);
        break;
      case 'trash':
        setShowSettings(false);
        setShowTrash(true);
        setEmptyTableMessage('No catcalls currently in trash');
        switchedRows = catcallData.filter(el => el.properties.trash === true);
        break;
      case 'settings':
        setShowSettings(true);
        setShowTrash(false);
        break;
      default: //unverified
        switchedRows = catcallData.filter(el => el.properties.trash === false && el.properties.verified === false);
        break;
    }
    //filter data for the value(tab) and setRows
    switchedRows && setRows(switchedRows.map(catcall => processCatCallsData(catcall))); 
  }, [value, catcallData]);

  const clickButtonUpdate = ({ variables }) => {
    updateCatcall({ variables }); //update db, remove from list and reset rows
    let newRows = rows.filter(row => {
      return row.id !== variables.id
    })
    setRows(newRows);
  }

  const onSubmit = async (data) => {
    await emptyTrash();
    setRows([]);
  }

  return (
    <>
    { showSettings ?
      <ModeratorSettings authorized={authorized} />
    : 
      <TableContainer component={Paper}>
        {/* generic dashboard table for all other functionalities */}
        { rows.length > 0 ?
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
        </Table> :
        <div style={{textAlign: 'center', padding: '50px'}}>{emptyTableMessage}</div>}
      </TableContainer>
    }
    { showTrash && authorized ? 
        <>
          <h2 className="mod-settings-header">More</h2>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{color: 'rgb(245, 37, 89'}}
            >
              <Typography><WarningIcon /> Empty Trash</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <input className="submit-button"  type="submit" value="Permanently empty trash" />
              </form>
            </AccordionDetails>
          </Accordion>
        </>
        :
        <></>
      }
    </>
  )
}

import { useState, useEffect } from 'react';
import Row from './AdminTableRow';
import ModeratorSettings from './ModeratorSettings';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { ExpandMore, Warning } from '@material-ui/icons';
import { useForm } from 'react-hook-form';

export default function AdminTable({ catcallData, updateCatcall, value, authorized, emptyTrash }) {

  const [showSettings, setShowSettings] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [emptyTableMessage, setEmptyTableMessage] = useState('No new catcalls to verify');
  const { handleSubmit } = useForm();
  const [rows, setRows] = useState(catcallData);

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
    switchedRows && setRows(switchedRows); 
  }, [value, catcallData]);

  const clickButtonUpdate = ({ variables }) => {
    updateCatcall({ variables });
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
    {/* if settings tab is selected, only load that seperate component */}
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
              <TableCell />
              <TableCell>Quote</TableCell>
              <TableCell>Actions </TableCell>
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
    {/* if in trashbin and full athority, show this extra section to permanently delete */}
    { showTrash && authorized ? 
        <>
          <h2 className="mod-settings-header">More</h2>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{color: 'rgb(245, 37, 89'}}
            >
              <Typography><Warning /> Empty Trash</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <input className="submit-button" type="submit" value="Permanently empty trash" />
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

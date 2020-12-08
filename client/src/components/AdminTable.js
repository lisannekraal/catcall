import { useState, useEffect } from 'react';

import Row from './AdminTableRow';

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

export default function AdminTable({ data, updateCatcall, value }) {

  //table contains 
  //  - all the getCetcalls from database; 
  //  - updateCatcall mutation query; 
  //  - value (selected tab)

  const [rows, setRows] = useState(data.map(catcall => processCatCallsData(catcall)))
  //rows is a list of all data in above format ----> might not be needed as it is taken care of by useEffect?

  useEffect(() => {
    let switchedRows;
    switch (value) {
      case 'unverified':
        switchedRows = data.filter(el => el.properties.trash === false && el.properties.verified === false);
        break;
      case 'chalk':
        switchedRows = data.filter(el => el.properties.trash === false && el.properties.verified === true && el.properties.chalked === false && el.properties.listedForChalk === true);
        break;
      case 'database':
        switchedRows = data.filter(el => el.properties.trash === false);
        break;
      case 'trash':
        switchedRows = data.filter(el => el.properties.trash === true);
        break;
      default: //unverified
        switchedRows = data.filter(el => el.properties.trash === false && el.properties.verified === false);
        break;
    }
    //filter data for the value(tab) and setRows
    setRows(switchedRows.map(catcall => processCatCallsData(catcall))); 
  }, [value]) //listens for a tab change


  const clickButtonUpdate = ({ variables }) => {
    updateCatcall({ variables }); //update db, remove from list and reset rows
    let newRows = rows.filter(row => {
      return row.id !== variables.id
    })
    setRows(newRows);
  }

  return (
    <TableContainer component={Paper}>
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
            //for each row component, functionality is send down (verification/editForm/delete/emptyTrash)
            <Row key={uuidv4()} tab={value} row={row} clickButtonUpdate={clickButtonUpdate} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

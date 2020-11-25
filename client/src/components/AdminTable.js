import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { v4 as uuidv4 } from 'uuid';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  verifyButton: {
    background: 'rgb(90, 124, 56)',
    margin: 2,
    width:68,
  },
  editButton: {
    background: 'rgb(196, 130, 31)',
    margin: 2,
    width:68,
  },
  deleteButton: {
    background: 'rgb(161, 54, 81)',
    margin: 2,
    width:68,
  },
});

/**
 * Function labels data in the table
 */

function unfilteredCatCallsData({ geometry, properties, _id }) {
  console.log(arguments)
  return {
    id: _id,
    catCallQuote: properties.quote,
    context: properties.context,
    dateAdded: (new Date(Number(properties.dateAdded))).toDateString(),
    dateCatcall: properties.dateCatcall ? (new Date(Number(properties.dateCatcall))).toDateString() : "no date",
    type: geometry.type,
    coordinates: geometry.coordinates,
  };
}

export default function CollapsibleTable({ data }) {
  console.log(data);
  const rows = data.map(catcall => unfilteredCatCallsData(catcall));
  console.log('catRows!!', rows);

  return (

    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Quote</TableCell>
            <TableCell align="right">Date Added</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={uuidv4()} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

/**
 * Each Row component takes a row of data
 */

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root} >
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.catCallQuote}
        </TableCell>
        <TableCell align="right">{row.dateAdded}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={() => {}}
            className={classes.verifyButton}
            >
            Verify
        </Button>
        <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={() => {}}
            className={classes.editButton}
            >
            Edit
        </Button>
        <Button
            variant="contained"
            color="inherit"
            size="small"
            onClick={() => {}}
            className={classes.deleteButton}
            >
            Delete
        </Button>
        </TableCell>
      </TableRow>
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
                      Date CatCall
                    </TableCell>
                    <TableCell >{row.dateCatcall}</TableCell>
                  </TableRow>

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      Position
                    </TableCell>
                    <TableCell>{`${row.coordinates[0].toFixed(3)}.. ${row.coordinates[1].toFixed(3)}..`}</TableCell>
                  </TableRow>

                  <TableRow key={uuidv4()}>
                    <TableCell component="th" scope="row">
                      Context
                    </TableCell>
                    <TableCell>{row.context}</TableCell>
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
/*
 Row.propTypes = {
   row: PropTypes.shape({
     calories: PropTypes.number.isRequired,
     carbs: PropTypes.number.isRequired,
     fat: PropTypes.number.isRequired,
     history: PropTypes.arrayOf(
       PropTypes.shape({
         amount: PropTypes.number.isRequired,
         customerId: PropTypes.string.isRequired,
         date: PropTypes.string.isRequired,
       }),
     ).isRequired,
     name: PropTypes.string.isRequired,
     price: PropTypes.number.isRequired,
     protein: PropTypes.number.isRequired,
   }).isRequired,
 };
*/
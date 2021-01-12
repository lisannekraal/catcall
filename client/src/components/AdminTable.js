import { useState, useEffect } from 'react';
import Row from './AdminTableRow';
import ModeratorSettings from './ModeratorSettings';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { ExpandMore, Warning } from '@material-ui/icons';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';


export default function AdminTable({ catcallData, updateCatcall, value, authorized, emptyTrash }) {

  const [tabSettings, setTabSettings] = useState({ showSettings: false, showTrash: false, emptyMessage: 'No new catcalls to verify', page: 0 })

  const { handleSubmit } = useForm();
  const [rows, setRows] = useState(catcallData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const tabDictionary = {
    'unverified': () => {
      setTabSettings({ ...tabSettings, showSettings: false, showTrash: false, emptyMessage: 'No new catcalls to verify' })
      return catcallData.filter(
        el => el.properties.trash === false && el.properties.verified === false);
    },
    'chalk': () => {
      setTabSettings({ ...tabSettings, showSettings: false, showTrash: false, emptyMessage: 'No catcalls on the list to chalk' })
      return catcallData.filter(
        el => el.properties.trash === false && el.properties.verified === true && el.properties.chalked === false && el.properties.listedForChalk === true);
    },
    'database': () => {
      setTabSettings({ ...tabSettings, showSettings: false, showTrash: false, emptyMessage: 'Database is empty' })
      return catcallData.filter(
        el => el.properties.trash === false && el.properties.verified === true);
    },
    'trash': () => {
      setTabSettings({ ...tabSettings, showSettings: false, showTrash: true, emptyMessage: 'No catcalls currently in trash' })
      return catcallData.filter(el => el.properties.trash === true);
    },
    'settings': () => {
      setTabSettings({ ...tabSettings, showSettings: true, showTrash: false })
    }
  }

  useEffect(() => {
    let switchedRows = tabDictionary[value]();
    setPage(0);
    switchedRows && setRows(switchedRows);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {/* if settings tab is selected, only load that seperate component */}
      { tabSettings.showSettings ?
        <ModeratorSettings authorized={authorized} />
        :
        <>
          <TableContainer component={Paper}>
            {/* generic dashboard table for all other functionalities */}
            {rows.length > 0 ?
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell><h3 className="catcall-font">Quote</h3></TableCell>
                    <TableCell><h3 className="catcall-font">Actions</h3></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice().reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <Row key={uuidv4()} tab={value} row={row} clickButtonUpdate={clickButtonUpdate} />
                  ))}
                </TableBody>
              </Table> :
              <div style={{ textAlign: 'center', padding: '50px' }}>{tabSettings.emptyMessage}</div>}
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      }
      {/* if in trashbin and full athority, show this extra section to permanently delete */}
      { tabSettings.showTrash && authorized ?
        <>
          <h2 className="mod-settings-header">More</h2>
          <Accordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{ color: 'rgb(245, 37, 89' }}
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

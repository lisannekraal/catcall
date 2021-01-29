import { useState, useEffect } from 'react';
import AdminTableRow from './AdminTableRow';
import AdminModeratorSettings from './AdminModeratorSettings';
import { useTranslation } from 'react-i18next';

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


export default function AdminTable({ catcallData, updateCatcall, value, authorized, emptyTrash, categoryLibrary }) {

  const { t } = useTranslation(['admin']);
  const [tabSettings, setTabSettings] = useState({ showSettings: false, showTrash: false, emptyMessage: 'No new catcalls to verify', page: 0 })

  const { handleSubmit } = useForm();
  const [rows, setRows] = useState(catcallData);
  const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPage = 10;

  const tabDictionary = {
    'unverified': () => {
      setTabSettings({ ...tabSettings, showSettings: false, showTrash: false, emptyMessage: t('table.empty.verify', 'default') })
      return catcallData.filter(
        el => el.properties.trash === false && el.properties.verified === false);
    },
    'chalk': () => {
      setTabSettings({ ...tabSettings, showSettings: false, showTrash: false, emptyMessage: t('table.empty.chalk', 'default') })
      return catcallData.filter(
        el => el.properties.trash === false && el.properties.verified === true && el.properties.chalked === false && el.properties.listedForChalk === true);
    },
    'database': () => {
      setTabSettings({ ...tabSettings, showSettings: false, showTrash: false, emptyMessage: t('table.empty.database', 'default') })
      return catcallData.filter(
        el => el.properties.trash === false && el.properties.verified === true);
    },
    'trash': () => {
      setTabSettings({ ...tabSettings, showSettings: false, showTrash: true, emptyMessage: t('table.empty.trash', 'default') })
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

  //temporarily turn off functionality to choose nr rows per page
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <>
      { tabSettings.showSettings ?
        <AdminModeratorSettings authorized={authorized} />
        :
        <>
          <TableContainer component={Paper}>
            { rows.length > 0 ?
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell />
                    <TableCell><h4>Quote</h4></TableCell>
                    <TableCell><h4>Actions</h4></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { rows.slice().reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <AdminTableRow 
                      key={uuidv4()} 
                      tab={value} 
                      row={row} 
                      clickButtonUpdate={clickButtonUpdate} 
                      categoryLibrary={categoryLibrary}
                    />
                  ))}
                </TableBody>
              </Table> :
              <div style={{ textAlign: 'center', padding: '50px' }}>{tabSettings.emptyMessage}</div>}
          </TableContainer>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              // onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </>
      }

      { tabSettings.showTrash && authorized ?
        <>
          <h3 style={{ margin: '19px', paddingTop: '20px' }}>{t('mod-settings.subtitle', 'default')}</h3>
          <Accordion TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              style={{ color: 'rgb(245, 37, 89' }}
            >
              <Typography><Warning /> {t('table.empty-trash.title', 'default')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input className="submit-button normal-font" type="submit" value={t('table.empty-trash.button', 'default')} />
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

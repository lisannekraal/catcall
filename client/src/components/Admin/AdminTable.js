import { useState, useEffect, useReducer, useCallback } from 'react';
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

import AdminTabs from './AdminTabs';

function reducer(state, action) {
  console.log('REDUCER', action)
  switch (action.type) {
    case 'verify':
      return {
        ...state,
        tabSettings: { showSettings: false, showTrash: false, emptyMessage: 'table is empty' },
        rows: state.catcallData.filter(el => el.properties.trash === false && el.properties.verified === false),
        value: 'verify',
      }
    case 'chalk':
      return {
        ...state,
        tabSettings: { ...state.setTabSettings, showSettings: false, showTrash: false, emptyMessage: 'table is empty' },
        rows: state.catcallData.filter(
          el => el.properties.trash === false && el.properties.verified === true && el.properties.chalked === false && el.properties.listedForChalk === true),
        value: 'chalk'
      }
    case 'database':
      return {
        ...state,
        tabSettings: { ...state.setTabSettings, showSettings: false, showTrash: false, emptyMessage: 'table is empty' },
        rows: state.catcallData.filter(el => el.properties.trash === false && el.properties.verified === true),
        value: 'database'
      }
    case 'trash':
      return {
        ...state,
        tabSettings: { ...state.setTabSettings, showSettings: false, showTrash: true, emptyMessage: 'table is empty' },
        rows: state.catcallData.filter(el => el.properties.trash === true),
        value: 'trash'
      }
    case 'settings':
      return {
        ...state,
        tabSettings: { ...state.setTabSettings, showSettings: true, showTrash: false },
        value: 'settings'
      }
    case 'updateCat':
      return {
        ...state,
        rows: state.rows.filter(row => row._id !== action.payload.variables.id),
      }
    case 'empty':
      console.log('Empty dispatch', action);
      return {
        ...state,
        rows: [],
        value: 'trash'
      }
    case 'updateData':
      console.log('Updating data', action);
      return {
        ...state,
        catcallData: action.payload.data,
      }
    default:
      console.log('Running default dispatch');
      return {
        ...state,
        tabSettings: { ...state.setTabSettings, showSettings: false, showTrash: false, emptyMessage: 'table is empty' },
        rows: state.catcallData.filter(el => el.properties.trash === false && el.properties.verified === false),
        value: 'verify'
      }
  }
}


export default function AdminTable({ catcallData, updateCatcall, authorized, emptyTrash, categoryLibrary }) {



  const newData = catcallData.slice().reverse();

  const [tableState, dispatch] = useReducer(reducer, {
    tabSettings: { showSettings: false, showTrash: false, emptyMessage: 'No new catcalls to verify' },
    catcallData: newData,
    rows: newData.filter(el => el.properties.trash === false && el.properties.verified === false),
    value: 'verify'
  })

  console.log('Render Admin TABLE: ', tableState);

  const { handleSubmit } = useForm();
  const [page, setPage] = useState(0);
  const { t } = useTranslation(['admin']);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  function emptyMessage(value) {
    return t(`table.empty.${value}`, 'default');
  }

  const rowsPerPage = 10;

  useEffect(() => {
    console.log('UPDATING data');
    dispatch({ type: 'updateData', payload: { data: catcallData.slice().reverse(), emptyMessage: emptyMessage() } })
  }, [catcallData]);

  const clickButtonUpdate = useCallback(({ variables }) => {
    updateCatcall({ variables });
    dispatch({ type: 'updateCat', payload: { variables: variables } })
  }, [updateCatcall]);



  const onSubmit = async (data) => {
    await emptyTrash();
    dispatch({ type: 'empty' })
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
      <AdminTabs value={tableState.value} dispatch={dispatch} authorized={authorized} />
      { tableState.tabSettings.showSettings ?
        <AdminModeratorSettings authorized={authorized} />
        :
        <>
          <TableContainer component={Paper}>
            {tableState.rows.length > 0 ?
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: '40px' }} />
                    <TableCell />
                    <TableCell><h4>Quote</h4></TableCell>
                    <TableCell><h4>Actions</h4></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableState.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <AdminTableRow
                      key={uuidv4()}
                      tab={tableState.value}
                      row={row}
                      clickButtonUpdate={clickButtonUpdate}
                      categoryLibrary={categoryLibrary}
                    />
                  ))}
                </TableBody>
              </Table> :
              <div style={{ textAlign: 'center', padding: '50px' }}>{emptyMessage(tableState.value)}</div>}
          </TableContainer>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={tableState.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
            // onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </>
      }

      { tableState.tabSettings.showTrash && authorized ?
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

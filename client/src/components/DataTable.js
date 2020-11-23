import * as React from 'react';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button'

export default function DataTable({ data }) {

  console.log('RECEIVED DATA >>>>>', data)

  const columns = [
    // { field: 'id', headerName: 'Starred', flex: 1 },
    { field: 'catCallQuote', headerName: 'Catcall quote', flex: 1 },
    { field: 'contextText', headerName: 'Context text', flex: 3 },
    { field: 'dateCatcall', headerName: 'Date catcall', flex: 1 },
    { field: 'dateAdded', headerName: 'Date added', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    {
      field: "",
      headerName: "Verify",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() =>
            updateCatcall({
              variables: {
                id: row._id,
                catcall: {
                  propertes: {
                    verified: true
                  }
                }
              }
            })
          }
        >
          Verify
        </Button>
      ),
    },
    {
      field: "",
      headerName: "Edit",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "",
      headerName: "Delete",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          Delete
        </Button>
      ),
    },
  ];

  let rows = data.map((row) => {
    return {
      id: row._id,
      catCallQuote: row.properties.quote,
      contextText: row.properties.context,
      dateCatcall: row.properties.dateCatcall ?
        (new Date(Number(row.properties.dateCatcall))).toDateString() :
        "no date",
      dateAdded: (new Date(Number(row.properties.dateAdded))).toDateString(),
      location: row.geometry.coordinates[0] + ',' + row.geometry.coordinates[1],
      verification: row.properties.verified,
    }
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
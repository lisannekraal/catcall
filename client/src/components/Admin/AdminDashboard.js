import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_CATCALL, GET_CATCALLS, EMPTY_TRASH, GET_MODERATOR_BY_TOKEN } from '../../api/queries';
import AdminTable from './AdminTable';
// import AdminTabs from './AdminTabs';
import AdminNotAuthorized from './AdminNotAuthorized';
import Loading from '../Loading';

function AdminDashboard({ categoryLibrary }) {

  //const [value, setValue] = useState('unverified');

  const { data: dataMod } = useQuery(GET_MODERATOR_BY_TOKEN);
  let { loading, error, data } = useQuery(GET_CATCALLS);
  const [updateCatcall] = useMutation(UPDATE_CATCALL);
  const [emptyTrash] = useMutation(EMPTY_TRASH, {
    refetchQueries: [{ query: GET_CATCALLS }]
  });

  console.log('Render Admin Dash');

  // const handleTabChange = (newValue) => {
  //   setValue(newValue);
  // };

  if (error) return (
    <AdminNotAuthorized />
  );
  if (loading) return (
    <Loading />
  );

  return (
    <>
      <div className="header-footer"></div>
      <div className="dashboard-container">
        {/* <AdminTabs value={value} handleChange={handleTabChange} dataMod={dataMod} /> */}

        {data ?
          (<AdminTable
            catcallData={data.getCatcalls}
            updateCatcall={updateCatcall}
            authorized={dataMod.getModeratorByToken.canAdd}
            categoryLibrary={categoryLibrary}
            emptyTrash={emptyTrash} />)
          :
          (<h2>Loading...</h2>)}

      </div>
      <div className="header-footer"></div>
    </>
  );
}
export default AdminDashboard;
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_CATCALL, GET_CATCALLS, EMPTY_TRASH, GET_MODERATOR_BY_TOKEN } from '../../api/queries';
import AdminTable from './AdminTable';
import AdminNotAuthorized from './AdminNotAuthorized';
import Loading from '../Loading';

function AdminDashboard({ categoryLibrary }) {

  const { data: dataMod } = useQuery(GET_MODERATOR_BY_TOKEN);
  let { loading, error, data } = useQuery(GET_CATCALLS);
  const [updateCatcall] = useMutation(UPDATE_CATCALL);
  const [emptyTrash] = useMutation(EMPTY_TRASH, {
    refetchQueries: [{ query: GET_CATCALLS }]
  });

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
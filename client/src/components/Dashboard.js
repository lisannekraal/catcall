import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_CATCALL, GET_CATCALLS, EMPTY_TRASH } from '../api/queries'
import AdminTable from './AdminTable';
import { Player } from '@lottiefiles/react-lottie-player';

import { Paper, Tabs, Tab } from '@material-ui/core';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Gesture from '@material-ui/icons/Gesture';
import Storage from '@material-ui/icons/Storage';
import Delete from '@material-ui/icons/Delete';
import Settings from '@material-ui/icons/Settings';

function Dashboard({ mod }) {

  const [ authorization, setAuthorization ] = useState(false);

  const [value, setValue] = React.useState('unverified'); //keeps track of selected tab

  let { loading, error, data } = useQuery(GET_CATCALLS);
  const [updateCatcall] = useMutation(UPDATE_CATCALL);
  const [ emptyTrash ] = useMutation(EMPTY_TRASH, {
    refetchQueries: [  {query: GET_CATCALLS} ]
  });

  useEffect(() => {
    setAuthorization(mod.canAdd);
  }, [mod]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (error) return (
    <div data-testid="page-not-found" className="not-found-container">
      <div className="header-footer"></div>
      <div data-testid="page-not-found" className="not-found">
        <h1>401</h1>
        <h2>You are not authorized to visit this page.</h2>
      </div>
      <div className="header-footer"></div>
    </div>
  );
  if (loading) return (
    <div data-testid="page-not-found" className="not-found-container">
      <div className="header-footer"></div>
      <div data-testid="page-not-found" className="not-found">
        <h1>Loading</h1>
        <Player
          autoplay
          loop
          src="https://assets8.lottiefiles.com/packages/lf20_vndsLD.json"
          style={{ height: '300px', width: '300px' }}
        >
        </Player>
      </div>
      <div className="header-footer"></div>
    </div>
  );
  return (
    <>
      <div className="header-footer"></div>
      <div className="dashboard-container">
        <Paper square style={{flexGrow: 1}}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="admin navigation"
          >
            <Tab icon={<VerifiedUser />} label="Verify Pending" value='unverified' wrapped />
            <Tab icon={<Gesture />} label="To Chalk" value='chalk' wrapped/>
            <Tab icon={<Storage />} label="Database" value='database' wrapped/>
            <Tab icon={<Delete />} label="Trash" value='trash' wrapped/>
            {authorization &&
              <Tab icon={<Settings />} label="Mod Settings" value='settings' wrapped/>
            }
          </Tabs>
        </Paper>

          {data ?
          (<AdminTable catcallData={data.getCatcalls} value={value} updateCatcall={updateCatcall} authorized={authorization} emptyTrash={emptyTrash} />)
          :
          (<h2>Loading...</h2>)}

      </div>
      <div className="header-footer"></div>
    </>
  );
}
export default Dashboard;
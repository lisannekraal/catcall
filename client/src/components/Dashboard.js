import React, {useState, useEffect} from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_CATCALL, GET_CATCALLS} from '../api/queries'
import './Dashboard.css';
import AdminTable from './AdminTable';

/**Material UI Imports */
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Gesture from '@material-ui/icons/Gesture';
import Storage from '@material-ui/icons/Storage';
import Delete from '@material-ui/icons/Delete';
import Settings from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function Dashboard() {

  const classes = useStyles();
  const [value, setValue] = React.useState('unverified'); //keeps track of selected tab
  const [updateCatcall] = useMutation(UPDATE_CATCALL,);
  let { loading, error, data } = useQuery(GET_CATCALLS);

  const handleChange = (event, newValue) => { /*What to do in case tab changes */
    if(newValue !== 'settings') setValue(newValue); //condition deactivates settings tab temporarily
  };

  useEffect(() => {

    console.log('Query has been called',value);
  }, [value])


  if (error) console.log(error);
  data && console.log('REFETCHED RESULTS:',data);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error at Fetching Data</p>;
  return (
    <>
      <div className="header-footer"></div>
        <Paper square className={classes.root}>
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
            <Tab icon={<Storage />} label="Databse" value='database' wrapped/>
            <Tab icon={<Delete />} label="Trash" value='trash' wrapped/>
            <Tab icon={<Settings />} label="Mod Settings" value='settings' wrapped/>
          </Tabs>
        </Paper>

        {data ? (<AdminTable data={data.getCatcalls} value={value} updateCatcall={updateCatcall} />) : (<h2>Loading...</h2>)}

      <div className="header-footer"></div>
    </>
  );
}
export default Dashboard;
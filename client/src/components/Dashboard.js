import React from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { GET_UNVERIFIED_CATCALLS, UPDATE_CATCALL } from '../api/queries'
import './Dashboard.css';
import AdminTable from './AdminTable';
import { v4 as uuidv4 } from 'uuid';

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
    width: '100%',
  },
});


function Dashboard() {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const { loading, error, data } = useQuery(GET_UNVERIFIED_CATCALLS);
  if (error) console.log(error);
  data && console.log(data.getUnfilteredCatcalls);
  const [updateCatcall] = useMutation(UPDATE_CATCALL);
  console.log('Obtained Data >>>>>', data);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <div className="header-footer"></div>
        <Paper square className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="Admin Menu"
          >
            <Tab icon={<VerifiedUser />} label="Verify Pending" />
            <Tab icon={<Gesture />} label="To Chalk" />
            <Tab icon={<Storage />} label="Databse" />
            <Tab icon={<Delete />} label="Trash" />
            <Tab icon={<Settings />} label="Mod Settings" />
          </Tabs>
        </Paper>

        {data ? (<AdminTable data={data.getUnfilteredCatcalls} />) : ''}

      <div className="header-footer"></div>
    </>
  );
}
export default Dashboard;
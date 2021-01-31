import React, { useState } from 'react'
import { Paper, Tabs, Tab } from '@material-ui/core';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Gesture from '@material-ui/icons/Gesture';
import Storage from '@material-ui/icons/Storage';
import Delete from '@material-ui/icons/Delete';
import Settings from '@material-ui/icons/Settings';
import { useTranslation } from 'react-i18next';


function AdminTabs({ value, dispatch, authorized }) {
  const { t } = useTranslation(['admin']);

  const handleTabChange = (event, newValue) => {
    dispatch({ type: newValue });
  };

  return (
    <Paper square style={{ flexGrow: 1 }}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="admin navigation"
      >
        <Tab icon={<VerifiedUser />} label={t('label.verify', 'default')} value='verify' wrapped />
        <Tab icon={<Gesture />} label={t('label.chalk', 'default')} value='chalk' wrapped />
        <Tab icon={<Storage />} label={t('label.database', 'default')} value='database' wrapped />
        <Tab icon={<Delete />} label={t('label.trash', 'default')} value='trash' wrapped />
        {authorized &&
          <Tab icon={<Settings />} label={t('label.settings', 'default')} value='settings' wrapped />
        }
      </Tabs>
    </Paper>
  )
}

export default React.memo(AdminTabs)

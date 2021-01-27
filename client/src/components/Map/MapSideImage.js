import React, { useState } from 'react';
import { Drawer, Button, Tooltip } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MapInstaTile from './MapInstaTile';

function MapSideImage({ url }) {
  const [drawerState, setDrawerState] = useState({ left: false })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setDrawerState({ [anchor]: open })
  }

  const sideDrawerList = anchor => (
    <div
      style={{width: '330px'}}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Fab variant="extended" style={{textTransform: 'none', marginTop: '15px', marginLeft: '15px', marginBottom: '15px', color: 'white', backgroundColor: 'rgb(245, 37, 89'}} onClick={e => {setDrawerState({ left: false })}}>
              <ArrowBackIosIcon />
              Close and go back to map
          </Fab>
      <MapInstaTile url={url} />
    </div>
  );

  return (
    <>
      <Tooltip title="Opens image to the side" arrow>
        <Button size="small" color="primary" onClick={toggleDrawer("left", true)}>
          <i className="popup-icon fas fa-pen"></i>
          <span style={{fontSize: '12px'}}>chalked back</span>
        </Button>
      </Tooltip>
      <Drawer
        anchor="left"
        open={drawerState.left}
        onClose={toggleDrawer("left", false)}
      >
        {sideDrawerList("left")}
      </Drawer>
    </>
  )
}

export default MapSideImage;
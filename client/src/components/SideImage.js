import React, { useState } from 'react';
import { Drawer, Button, Tooltip } from '@material-ui/core';
import InstaTile from './InstaTile';

function SideImage({ url }) {

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
      <InstaTile url={url} />
    </div>
  );

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default SideImage;
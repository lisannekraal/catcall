import React, { useState } from 'react'
import { Drawer, Button } from "@material-ui/core"
import InstaTile from './InstaTile'

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
      style={{width: '350px'}}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <InstaTile url={url} />
    </div>
  );


  return (
    <React.Fragment>
      <Button size="small" color="primary" onClick={toggleDrawer("left", true)}>
        <i className="popup-icon fas fa-pen"></i>chalked back
      </Button> 
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
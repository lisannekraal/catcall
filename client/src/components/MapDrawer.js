import React, { useState } from 'react'
import { IconButton, Drawer } from "@material-ui/core"
import HelpIcon from '@material-ui/icons/Help';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `black`,
  },
})

function MapDrawer({ navLinks }) {

  const classes = useStyles();

  const [drawerState, setDrawerState] = useState({ right: false })
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
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      Content
    </div>
  );


  return (
    <React.Fragment>

      <IconButton edge="end" aria-label="info" onClick={toggleDrawer("right", true)} >
        <HelpIcon fontSize="large" style={{ color: `white` }}/>
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerState.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideDrawerList("right")}
      </Drawer>

    </React.Fragment>
  )
}

export default MapDrawer;
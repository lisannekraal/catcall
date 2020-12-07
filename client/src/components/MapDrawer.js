import React, { useState } from 'react'
import { IconButton, List, ListItem, ListItemText, Drawer, ListItemIcon,Typography } from "@material-ui/core"
import HelpIcon from '@material-ui/icons/Help';
import { HashLink as Link } from 'react-router-hash-link';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

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

  let history = useHistory();
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
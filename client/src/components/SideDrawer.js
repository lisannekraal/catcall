import React, { useState } from 'react'
import { IconButton, List, ListItem, ListItemText, Drawer, ListItemIcon,Typography } from "@material-ui/core"
import { Menu } from "@material-ui/icons"

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import LoginModal from './Login-Modal';


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

function SideDrawer({ navLinks }) {

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
      <List component="nav">
      <ListItem button onClick={() => history.push("/catcalls/new")} style={{background: 'rgb(245, 37, 89)'}}>
      <ListItemIcon className="fas fa-cat"/>
      <ListItemText  primary={<Typography variant="button">Report a new CatCall</Typography>}/>
      </ListItem>
        {navLinks.map(({ title, path, classN }) => (
          <ListItem button onClick={path}>
            <ListItemIcon className={classN}/>
            <ListItemText primary={<Typography variant="button">{title}</Typography>}/>
      </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <React.Fragment>

      <IconButton edge="start" aria-label="menu" onClick={toggleDrawer("right", true)} >
        <Menu fontSize="large" style={{ color: `white` }}/>
      </IconButton>
      <Drawer
        anchor="right"
        open={drawerState.right}
        onOpen={toggleDrawer("right", true)}
        onClose={toggleDrawer("right", false)}
      >
        {sideDrawerList("right")}
      </Drawer>

    </React.Fragment>
  )
}

export default SideDrawer

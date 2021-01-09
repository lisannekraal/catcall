import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
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

        {/* Again 'about' section in seperate component because of hash link */}
        <Link to="/#about" style={{textDecoration: 'none', color:'#000000DE'}} >
          <ListItem button key={uuidv4()}>
            <ListItemIcon className='fas fa-info-circle'/>
            <ListItemText primary={<Typography variant="button">about</Typography>}/>
          </ListItem>
        </Link>

        {navLinks.map(({ title, path, classN }) => (
        <ListItem button onClick={path} key={uuidv4()}>
          <ListItemIcon className={classN}/>
          <ListItemText primary={<Typography variant="button">{title}</Typography>}/>
        </ListItem>
        ))}

        <ListItem button key={uuidv4()} onClick={() => history.push("/catcalls/new")} style={{background: 'rgb(245, 37, 89)'}}>
          <ListItemIcon className="fas fa-cat"/>
          <ListItemText  primary={<Typography variant="button">Report a new CatCall</Typography>}/>
        </ListItem>

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
        onClose={toggleDrawer("right", false)}
      >
        {sideDrawerList("right")}
      </Drawer>

    </React.Fragment>
  )
}

export default SideDrawer

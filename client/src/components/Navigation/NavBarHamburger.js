import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Menu } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MapIcon from '@material-ui/icons/Map';
import InstagramIcon from '@material-ui/icons/Instagram';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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

function NavBarHamburger({ loggedIn, setLoggedIn, removeCookie }) {

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

        <Link to="/#about" style={{textDecoration: 'none', color:'#000000DE'}} >
          <ListItem button key={uuidv4()}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={
              <Typography variant="button" style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}}>About</Typography>
            }/>
          </ListItem>
        </Link>

        <ListItem button key={uuidv4()} onClick={() => history.push({pathname: '/catcalls'})} >
          <ListItemIcon>
            <MapIcon />
          </ListItemIcon>
          <ListItemText  primary={
            <Typography variant="button" style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}}>Map</Typography>
          }/>
        </ListItem>

        <ListItem button key={uuidv4()} onClick={() => window.open('https://www.instagram.com/catcallsofams/', '_blank')} >
          <ListItemIcon>
            <InstagramIcon />
          </ListItemIcon>
          <ListItemText  primary={
            <Typography variant="button" style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}}>Community</Typography>
          }/>
        </ListItem>

        { loggedIn ?
          <>
            <ListItem button key={uuidv4()} onClick={() => history.push('/dashboard')} >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText  primary={
                <Typography variant="button" style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}}>Dashboard</Typography>
              }/>
            </ListItem>

            <ListItem button key={uuidv4()} onClick={() => {
              removeCookie('token');
              setLoggedIn(false);
              history.push('/');
            }} >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText  primary={
                <Typography variant="button" style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}}>Logout</Typography>
              }/>
            </ListItem>
          </>
        :
        <ListItem button key={uuidv4()} onClick={() => history.push('/login')} >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText  primary={
            <Typography variant="button" style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}}>Moderator</Typography>
          }/>
        </ListItem>
        }

        <ListItem button key={uuidv4()} onClick={() => history.push("/catcalls/new")} style={{background: 'rgb(245, 37, 89)'}}>
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText  primary={
            <Typography variant="button" style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}}>Report a new CatCall</Typography>
          }/>
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

export default NavBarHamburger

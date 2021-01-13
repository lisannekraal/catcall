import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import SideDrawer from './SideDrawer';
import './Header.css';
import logo from '../assets/Logo2.png'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List, Container, Hidden } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 42,
    width: 50,
    marginRight: 7,
  },
  navButton: {
    background: 'rgb(245, 37, 89)',
    borderRadius: 8,
    padding: '10px 15px',
    borderColor: '-internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))',
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navDisplayLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    padding: '0 10px',
  }
}));

function Header({ token, removeCookie, setMod }) {

  let history = useHistory();
  const classes = useStyles();
  const [ navigations, setNavigations ] = useState([]);

  let navLinksPermanent = [
    {
      title: 'map',
      classN: 'fas fa-map-marked-alt',
      path: () => history.push({
        pathname: '/catcalls'
      })
    },
    {
      title: 'community',
      classN: 'fab fa-instagram',
      path: () => window.open('https://www.instagram.com/catcallsofams/', '_blank')
    }
  ];

  useEffect(() => {
    //depending on the mod token, show functionalities navbar

    if (token && token !== 'null') {
      setNavigations([...navLinksPermanent,
        {
          title: 'dashboard',
          classN: 'fas fa-cog',
          path: () => history.push('/dashboard')
        },
        {
        title: 'logout',
        classN: 'fas fa-user',
        path: () => {
          removeCookie('token');
          setMod(false);
          history.push('/');
        }
      }]);
    } else {
      setNavigations([...navLinksPermanent, {
          title: 'moderator',
          classN: 'fas fa-cog',
          path: () => history.push('/login')
      }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AppBar color='transparent' position="absolute" elevation={0} data-testid="navbar">
      <Toolbar style={{ color: 'white' }}>

        <Container className={classes.navDisplayFlex} maxWidth="xl">

          <div className="navbar-brand" onClick={() => history.push("/")}>
            <img src={logo} alt="logo" className={classes.logo} />
            <div className="catcall-font"> Catcalls of Amsterdam</div>
          </div>

          <Hidden mdDown>
            <List component="nav" className={classes.navDisplayLinks}>

              {/* 'About' nav component is seperate from loop as we use hash link package */}
              <Link
                to="/#about"
                className="about-link" >
                <Button key={uuidv4()} color='inherit' startIcon={<Icon className='fas fa-info-circle' fontSize="small" style={{ marginRight: 7 }} />} >About</Button>
              </Link>

              {navigations.map(({ title, classN, path }) => (
                <Button
                  key={uuidv4()}
                  onClick={path}
                  color='inherit'
                  startIcon={<Icon className={classN} fontSize="small" style={{ marginRight: 7 }} />}
                >{title}
                </Button>
              ))}
            </List>
          </Hidden>

          <Hidden mdDown>
            <Button  key={uuidv4()} color="inherit" className={classes.navButton} onClick={() => history.push("/catcalls/new")}>Report a new CatCall</Button>
          </Hidden>

        </Container>

        {/* Side drawer component for smaller screens */}
        <Hidden lgUp>
          <SideDrawer navLinks={navigations} />
        </Hidden>

      </Toolbar>
    </AppBar>
  )
}

export default Header;
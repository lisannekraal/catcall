import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@apollo/client';
import { GET_MODERATOR_BY_TOKEN } from '../../api/queries';
import { useTranslation } from 'react-i18next';

import NavBarHamburger from './NavBarHamburger';
import logo from '../../assets/Logo2.png'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { List, Container, Hidden } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import MapIcon from '@material-ui/icons/Map';
import InstagramIcon from '@material-ui/icons/Instagram';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LanguageIcon from '@material-ui/icons/Language';
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

function NavBar({ removeCookie }) {

  const { t, i18n } = useTranslation(['navigation']);
  let history = useHistory();
  const classes = useStyles();
  const [ loggedIn, setLoggedIn ] = useState(false);
  const { data } = useQuery(GET_MODERATOR_BY_TOKEN);

  useEffect(() => {
    if (data && data.getModeratorByToken) {
      setLoggedIn(true);
    }
  }, [data])

  const changeLanguage = code => {
    const getCurrentLng = () => i18n.language || window.localStorage.i18nextLng || '';

    if (getCurrentLng() === 'nl') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('nl');
    }
  };

  return (
    <AppBar color='transparent' position="absolute" elevation={0} data-testid="navbar">
      <Toolbar style={{ color: 'white' }}>

        <Container className={classes.navDisplayFlex} maxWidth="xl">

          <div className="navbar-brand" onClick={() => history.push("/")}>
            <img src={logo} alt="logo" className={classes.logo} />
            <div className="catcall-font"> {t('title', 'default')}</div>
          </div>

          <Hidden mdDown>
            <List component="nav" className={classes.navDisplayLinks}>

              <Link
                to="/#about"
                className="about-link" >
                <Button key={uuidv4()} color='inherit' style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}} startIcon={<InfoIcon />} >
                  {t('navbar.about', 'default')}
                </Button>
              </Link>
              <Button key={uuidv4()} style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}} onClick={() => history.push({pathname: '/catcalls'})} color='inherit' startIcon={<MapIcon />}>
                {t('navbar.map', 'default')}
              </Button>
              <Button key={uuidv4()} style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}} onClick={() => window.open('https://www.instagram.com/catcallsofams/', '_blank')} color='inherit' startIcon={<InstagramIcon />}>
                {t('navbar.community', 'default')}
              </Button>

              { loggedIn ?
                <>
                  <Button key={uuidv4()} style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}} onClick={() => history.push('/dashboard')} color='inherit' startIcon={<SettingsIcon />}>
                    {t('navbar.dashboard', 'default')}
                  </Button>

                  <Button key={uuidv4()} style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}} onClick={() => {
                    removeCookie('token');
                    setLoggedIn(false);
                    history.push('/');
                  }} color='inherit' startIcon={<AccountCircleIcon />}>
                    {t('navbar.logout', 'default')}
                  </Button>
                </>
              :
                <Button key={uuidv4()} style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}} onClick={() => history.push('/login')} color='inherit' startIcon={<SettingsIcon />}>
                  {t('navbar.moderator', 'default')}
                </Button>
              }

              <Button key={uuidv4()} style={{textTransform: 'none', fontFamily: 'Arista Pro Alternate Bold', fontSize: '20px'}} onClick={() => changeLanguage()} color='inherit' startIcon={<LanguageIcon />}>
                {t('navbar.lang', 'default')}
              </Button>
              
            </List>
          </Hidden>
              

          <Hidden mdDown>
            <Button style={{textTransform: 'none', fontSize: '16px'}} key={uuidv4()} color="inherit" className={classes.navButton} onClick={() => history.push("/catcalls/new")}>{t('navbar.report-button', 'default')}</Button>
          </Hidden>

        </Container>

        <Hidden lgUp>
          <NavBarHamburger loggedIn={loggedIn} setLoggedIn={setLoggedIn} removeCookie={removeCookie} />
        </Hidden>

      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logowhite.png';
import Grid from '@material-ui/core/Grid';


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
  }
}));

function Navbar() {

  let history = useHistory();

  const classes = useStyles();

  return (
    <AppBar color='transparent' position="sticky" elevation={0}>
      <Toolbar style={{ color: 'white' }}>
        <Grid container justify="space-between" alignItems='center' style={{ height: '100%' }}>
          <Grid container xs={2} md={3} justify='center'>
            <div className="navbar-brand">
              <img src={logo} alt="logo" className={classes.logo} />
              <div> Catcalls of Amsterdam</div>
            </div>
          </Grid>
          <Grid item xs={10} md={8}>
            <Grid container justify="space-evenly">
              <Grid container xs={2} alignItems="center" justify="center">
                <Icon className="fas fa-info-circle" fontSize="small" style={{ marginRight: 7 }} onClick={() => history.push("/#about")}/>
                <Typography variant="overline">ABOUT</Typography>
              </Grid>
              <Grid container xs={2} alignItems="center" justify="center" onClick={() => history.push("/catcalls")}>
                <Icon className="fas fa-map-marked-alt" fontSize="small" style={{ marginRight: 7 }} />
                <Typography variant="overline">MAP</Typography>
              </Grid>
              <Grid container xs={2} alignItems="center" justify="center">
                <Icon className="fab fa-instagram" fontSize="small" style={{ marginRight: 7 }} />
                <Typography variant="overline">COMMUNITY</Typography>

              </Grid>
              <Grid container xs={2} alignItems="center" justify="center">
                <Icon className="fas fa-user-cog" fontSize="small" style={{ marginRight: 7 }} />
                <Typography variant="overline">MODERATORS</Typography>

              </Grid>
              <Grid container xs={3} alignItems="center" justify="center">
                <Button color="inherit" className={classes.navButton}>Report a new CatCall</Button>

              </Grid>


            </Grid>

          </Grid>


        </Grid>

      </Toolbar>
    </AppBar>
  )
}

export default Navbar

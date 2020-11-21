import './App.css';
import Logo from './assets/logowhite.png';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

import MapMain from './components/Map-main';
import Landing from './components/Landing';
import ReportForm from './components/ReportForm';
import LoginModal from './components/Login-Modal';
import Dashboard from './components/Dashboard';
import NotFound from './components/Not-found'

// import Navbar from './components/Navbar';

const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_SERVER,
  cache: new InMemoryCache({
    addTypename: false
  })
});



function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="navbar" data-testid="navbar" >
        <div className="navbar-content">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
            <div className="navbar-brand">
              <div className="navbar-logo"><img src={Logo} alt="logo"></img></div>
              <div> Catcalls of Amsterdam</div>
            </div>
          </Link>

          <div className="navbar-content-right">
            <div className="navbar-about">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/#about"><i className="fas fa-info-circle"></i> ABOUT</Link>
            </div>

            <div className="navbar-map">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/catcalls"><i className="fas fa-map-marked-alt"></i> MAP</Link>
            </div>
            <div className="navbar-community">
              <a style={{ textDecoration: 'none', color: 'white' }} href="https://www.instagram.com/catcallsofams/" target="_blank" rel="noreferrer nofollow"><i className="fab fa-instagram"></i> COMMUNITY</a>
            </div>
            <div className="navbar-login">
              <LoginModal />
              {/* <i className="fas fa-user-cog"></i> MODERATORS */}
              {/* <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><i className="fas fa-user-cog"></i> MODERATORS</Link> */}
            </div>
            <div className="navbar-report">
              <Link to="/catcalls/new"><button><p>Report a new datcall</p></button></Link>
            </div>

          </div>
        </div>
      </div>
      {/* <Navbar/> */}

        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/catcalls">
            <MapMain />
          </Route>
          <Route exact path="/catcalls/new">
            <ReportForm />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/404">
            <NotFound />
          </Route>
          <Redirect to="/404"/>
        </Switch>
      </Router>

    </ApolloProvider>

  );
}


export default App;

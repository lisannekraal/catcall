import './App.css';
import './components/Navbar.css';
import Logo from './assets/logowhite.png';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import Navbar from './components/Navbar';
import MapMain from './components/Map-main';
import Landing from './components/Landing';
import ReportForm from './components/Report-form';

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
        
      <div className="navbar">
        <div className="navbar-content">
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
            <div className="navbar-brand">
              <div className="navbar-logo"><img src={Logo} alt="logo"></img></div>
              <div> Catcalls of Amsterdam</div>
            </div>
          </Link>

          <div className="navbar-content-right">
            <div classname="navbar-about">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><i class="fas fa-info-circle"></i> ABOUT</Link>
            </div>
            <div classname="navbar-map">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/catcalls"><i class="fas fa-map-marked-alt"></i> MAP</Link>
            </div>
            <div classname="navbar-community">
              <a style={{ textDecoration: 'none', color: 'white' }} href="https://www.instagram.com/catcallsofams/" target="_blank" rel="noreferrer nofollow"><i class="fab fa-instagram"></i> COMMUNITY</a>
            </div>
            <div className="navbar-login">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/"><i class="fas fa-user-cog"></i> MODERATORS</Link>
            </div>
            <div className="navbar-report">
              <Link to="/catcalls/new"><button><p>Report a new datcall</p></button></Link>
            </div>

          </div>
        </div>
      </div>

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
        </Switch>
      </Router>


        {/* <Landing /> */}
        {/* <MapMain /> */}
        {/* <ReportForm /> */}

    </ApolloProvider>

  );
}


export default App;

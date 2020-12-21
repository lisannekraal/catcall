import './App.css';
import React, { useState } from 'react';
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';

import MapMain from './components/MapMain';
import Landing from './components/Landing';
import ReportForm from './components/ReportForm';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import EditForm from './components/EditForm';
import Help from './components/Help';
import NotFound from './components/NotFound';

import Header from './components/Header';


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [mod, setMod] = useState(false);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_APOLLO_SERVER,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from cookies if it exists
    const token = cookies.token;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    connectToDevTools: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
    })
  });

  function setModerator(moderatorObj) {
    setMod(moderatorObj);
    console.log('new moderator is set from App.js');
    console.log(mod);
  }

  console.log('new moderator is set from App.js');
  console.log(mod);

  return (
    <ApolloProvider client={client}>
      <Router>

        <Header token={cookies.token} removeCookie={removeCookie} setMod={setMod} />

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
          <Route exact path="/login">
            <Login setCookie={setCookie} setMod={setMod}/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard token={cookies.token} mod={mod} />
          </Route>
          <Route exact path="/catcalls/edit">
            <EditForm />
          </Route>
          <Route exact path="/help">
            <Help />
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

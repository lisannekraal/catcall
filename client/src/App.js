import './App.css';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import MapMain from './components/Map-main';
import Landing from './components/Landing';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';
import NotFound from './components/Not-found';

import Header from './components/Header';

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

      <Header/>

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

import './App.css';

import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';

import MapMain from './components/MapMain';
import Landing from './components/Landing';
import ReportForm from './components/ReportForm';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

import Header from './components/Header';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_APOLLO_SERVER,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from cookies if it exists
  const token = '5fbbaa2251817d304219d025';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

const client = new ApolloClient({
  
  link: authLink.concat(httpLink),
  
  cache: new InMemoryCache({
    addTypename: false
  })
});



function App() {

  const [cookies, setCookie] = useCookies(['token']);
  
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
          <Route exact path="/login">
            <Login setCookie={setCookie} />
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

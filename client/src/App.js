import './App.css';
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import MapMain from './components/MapMain';
import Landing from './components/Landing';
import ReportForm from './components/ReportForm';
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import EditForm from './components/EditForm';
import Help from './components/Help';
import NotFound from './components/NotFound';
import Header from './components/Header';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat', 
      'sans-serif'
    ].join(','),
  }
});

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

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

  return (
    <ApolloProvider client={client}>
      <Router basename={process.env.PUBLIC_URL} >
        <ThemeProvider theme={theme}>

        <Header removeCookie={removeCookie} />

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
            <Login setCookie={setCookie}/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
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

        </ThemeProvider>
      </Router>

    </ApolloProvider>

  );
}


export default App;

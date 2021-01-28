import {
  ApolloProvider, createHttpLink, ApolloClient, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import MapMain from './components/Map/MapMain';
import Landing from './components/Landing/Landing';
import ReportForm from './components/ReportForm/ReportForm';
import Login from './components/Login/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminEditForm from './components/Admin/AdminEditForm';
import Help from './components/Help/Help';
import NotFound from './components/NotFound/NotFound';
import NavBar from './components/Navigation/NavBar';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
});

console.log('hello');

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_APOLLO_SERVER,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from cookies if it exists
    const { token } = cookies;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    connectToDevTools: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
    }),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>

          <NavBar removeCookie={removeCookie} />

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
              <AdminDashboard />
            </Route>
            <Route exact path="/catcalls/edit">
              <AdminEditForm />
            </Route>
            <Route exact path="/help">
              <Help />
            </Route>
            <Route path="/404">
              <NotFound />
            </Route>
            <Redirect to="/404" />
          </Switch>

        </ThemeProvider>
      </Router>

    </ApolloProvider>

  );
}

export default App;

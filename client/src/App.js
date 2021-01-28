import React, { lazy, Suspense } from "react";
import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Landing from './components/Landing/Landing';
import NavBar from './components/Navigation/NavBar';

const MapMain = lazy(() => import("./components/Map/MapMain"));
const AdminDashboard = lazy(() => import("./components/Admin/AdminDashboard"));
const AdminEditForm = lazy(() => import("./components/Admin/AdminEditForm"));
const ReportForm = lazy(() => import("./components/ReportForm/ReportForm"));
const Login = lazy(() => import("./components/Login/Login"));
const Help = lazy(() => import("./components/Help/Help"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ].join(','),
  },
});

const categoryLibrary = {
  'sexual': 'Sexual Harassment',
  'homophobia': 'Homophobia',
  'transphobia': 'Transphobia',
  'fatphobia': 'Fatphobia',
  'racism': 'Racism',
  'fetishization': 'Fetishization',
  'slutshaming': 'Slutshaming',
  'hateSpeech': 'Hate speech',
  'young': 'Young',
  'assault': 'Assault',
  'staring': 'Staring',
  'following': 'Following',
  'other': 'Other',
}

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
      <Suspense fallback={<div></div>}>
        <Router>
          <ThemeProvider theme={theme}>

            <NavBar removeCookie={removeCookie} />

            <Switch>
              <Route exact path="/">
                <Landing />
              </Route>
              <Route exact path="/catcalls">
                <MapMain categoryLibrary={categoryLibrary} />
              </Route>
              <Route exact path="/catcalls/new">
                <ReportForm />
              </Route>
              <Route exact path="/login">
                <Login setCookie={setCookie} />
              </Route>
              <Route exact path="/dashboard">
                <AdminDashboard categoryLibrary={categoryLibrary} />
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
      </Suspense>

    </ApolloProvider>

  );
}

export default App;

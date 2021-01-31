import React, { lazy, Suspense } from "react";
import { useTranslation } from 'react-i18next';
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

function App() {
  const { t } = useTranslation(['categories']);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const categoryLibrary = {
    'sexual': t('sexual', 'default'),
    'homophobia': t('homophobia', 'default'),
    'transphobia': t('transphobia', 'default'),
    'fatphobia': t('fatphobia', 'default'),
    'racism': t('racism', 'default'),
    'fetishization': t('fetishization', 'default'),
    'slutshaming': t('slutshaming', 'default'),
    'hateSpeech': t('hateSpeech', 'default'),
    'young': t('young', 'default'),
    'assault': t('assault', 'default'),
    'staring': t('staring', 'default'),
    'following': t('following', 'default'),
    'other': t('other', 'default')
  }

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

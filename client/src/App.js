import './App.css';
import Navbar from './components/Navbar';
import MapMain from './components/Map-main';
import Landing from './components/Landing';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
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
      <div className="App">

        <Landing />
        {/* <MapMain /> */}
        {/* <ReportForm /> */}
      </div>
    </ApolloProvider>

  );
}

export default App;

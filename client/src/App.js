import './App.css';

import MapMain from './components/Map-main';
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
        <div className="presentation">
          <h1>MAPBOX</h1>
          <div>What is mapbox</div>
          <div>mapbox-gl and react-map-gl packages</div>
          <div>short demo</div>
        </div>

        <MapMain />
        <ReportForm />
      </div>
    </ApolloProvider>

  );
}

export default App;

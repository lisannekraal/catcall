import './App.css';

import MapMain from './components/Map-main';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

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
        <MapMain />
      </div>
    </ApolloProvider>

  );
}

export default App;

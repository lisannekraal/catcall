const dotenv = require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { request } = require('http');

const loggerPlugin = {

  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    console.log('Request started! Query:\n');
    console.log(requestContext.request)
    return {
      didEncounterErrors(rc) {
        console.log(rc.errors)
      },

    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    loggerPlugin,
  ]
});



server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

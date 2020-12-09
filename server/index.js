const dotenv = require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const loggerPlugin = {

  // Fires whenever a GraphQL request is received from a client.
  requestDidStart(requestContext) {
    // console.log('Request started! Query:\n');
    // console.log(requestContext.request)
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
  ],
  context: async ({req}) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    let mod = {};
    if (token !== '') {
      mod = await resolvers.Query.getModeratorById(null, {id: token});
    }

    // add the user to the context
    return { mod };
  }
});



server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

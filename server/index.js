const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
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
    const token = req.headers.authorization || '';
    let mod = {};

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      mod = await resolvers.Query.getModeratorById(null, {id: decoded.id});
    } catch (e) {
      // console.log(e)
      // throw new AuthenticationError(
      //   'Authentication token is invalid, please log in',
      // )
    }

    // add the user to the context
    return { mod };
  }
});



server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

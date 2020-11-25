const dotenv = require('dotenv').config();
const { ApolloServer }  = require('apollo-server');
const typeDefs          = require('./typeDefs');
const resolvers         = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
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

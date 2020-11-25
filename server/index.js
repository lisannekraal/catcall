const dotenv = require('dotenv').config();
const { ApolloServer }  = require('apollo-server');
const typeDefs          = require('./typeDefs');
const resolvers         = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    console.log(req.headers);
    console.log();
    console.log(req.headers.authorization);

    // Get the user token from the headers.
    const token = req.headers.authorization || '';

    // try to retrieve a user with the token
    const mod = await resolvers.Query.getModeratorById(null, {id: token});
    console.log(mod);

    // if (!mod) throw new AuthenticationError('you must be logged in');

    // add the user to the context
    return { mod };
  }
});



server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

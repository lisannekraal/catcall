const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getCatcalls:[Catcall!]!
    getCatcall(id:Int!):Catcall!
  }

  type Catcall {
    id: Int
    type: String!
    geometry: Geometry!
    properties: Properties!
  }

  type Geometry {
    type: String;
    coordinates: [Int!]!
  }

  type Properties {
    quote: String!
    
  }

  type Mutation {
    createCatcall(

    ): Catcall!
  }
`;

module.exports = typeDefs;
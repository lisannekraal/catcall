const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    getCatcalls:[Catcall]
    getCatcall(id:Int!):Catcall
    getFilteredCatcalls(
      condition:String!
    ):[Catcall]
  }

  type Mutation {
    createCatcall(
      catcall:CatcallInput!
    ):Catcall!
    updateCatcall(
      catcall:CatcallUpdateInput!
    ):Catcall!
  }

  type Catcall {
    _id: ID
    type: String!
    geometry: Geometry!
    properties: Properties!
  }

  input CatcallInput {
    type: String!
    geometry: GeometryInput!
    properties: PropertiesInput!
  }

  input CatcallUpdateInput {
    type: String
    geometry: GeometryUpdateInput
    properties: PropertiesUpdateInput
  }

  type Geometry {
    type: String
    coordinates: [Float!]!
  }

  input GeometryInput {
    type: String
    coordinates: [Float!]!
  }

  input GeometryUpdateInput {
    type: String
    coordinates: [Float]
  }

  type Properties {
    quote: String!
    context: String
    dateCatcall: String
    dateAdded: String!
    url: String
    verified: Boolean!
    chalked: Boolean!
    listedForChalk: Boolean!
    starred: Boolean!
    trash: Boolean!
  }

  input PropertiesInput {
    quote: String!
    context: String
    dateCatcall: String
    dateAdded: String!
    url: String
    verified: Boolean!
    chalked: Boolean!
    listedForChalk: Boolean!
    starred: Boolean!
    trash: Boolean!
  }

  input PropertiesUpdateInput {
    quote: String
    context: String
    dateCatcall: String
    dateAdded: String
    url: String
    verified: Boolean
    chalked: Boolean
    listedForChalk: Boolean
    starred: Boolean
    trash: Boolean
  }
`

module.exports = typeDefs;
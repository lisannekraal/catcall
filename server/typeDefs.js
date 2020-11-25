const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    getCatcalls:[Catcall]
    getCatcall(id:ID):Catcall
    getFilteredCatcalls(
      condition:String!
    ):[Catcall]
    getUnfilteredCatcalls(
      condition:String!
    ):[Catcall]
    getModeratorById(id:String):Moderator
    validateModerator(email:String, password:String):Moderator
  }

  type Mutation {
    createCatcall(
      catcall:CatcallInput!
    ):Catcall!
    updateCatcall(
      id: ID
      catcall:CatcallUpdateInput!
    ):Catcall!
    emptyTrash:[Catcall]
    createModerator(moderator:ModeratorInput):Moderator
    updateModerator(
      id:ID
      moderator:ModeratorInput
    ):Moderator
    removeModerator(id:ID):Moderator
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
    type: String!
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

  type Moderator {
    _id: ID!
    email: String!
    password: String!
    canAdd: Boolean
  }

  input ModeratorInput {
    email: String!
    password: String!
    canAdd: Boolean
  }
`

module.exports = typeDefs;
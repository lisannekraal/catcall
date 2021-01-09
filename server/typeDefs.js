const { gql } = require('apollo-server');

const typeDefs = gql`

  type Query {
    getCatcalls:[Catcall]
    getCatcall(id:String):Catcall
    getVerifiedCatcalls:[Catcall]
    getModerators:[Moderator]
    getModeratorById(id:String):Moderator
    validateModerator(email:String, password:String):Moderator
  }

  type Mutation {
    createCatcall(
      catcall:CatcallInput!
    ):Catcall!
    updateCatcall(
      id: String!
      catcall:CatcallUpdateInput!
    ):Catcall!
    emptyTrash:String
    createModerator(moderator:ModeratorInput):Moderator
    updateModerator(
      id:ID
      moderator:ModeratorInput
    ):Moderator
    removeModerator(id:String):Moderator
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
    _id: ID
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
    categories: [String]
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
    categories: [String]
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
    categories: [String]
  }

  type Moderator {
    _id: ID!
    email: String!
    password: String!
    canAdd: Boolean
    token: String
  }

  input ModeratorInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
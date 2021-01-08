import { gql } from '@apollo/client';

export const GET_MAP_CATCALLS = gql`
  {
    getVerifiedCatcalls {
      _id
      type
      geometry {
        type
        coordinates
      }
      properties {
        quote
        context
        dateCatcall
        url
        chalked
        categories
      }
    }
  }
`;

export const GET_CATCALLS = gql`
  {
    getCatcalls {
      _id
      type
      geometry {
        type
        coordinates
      }
      properties {
        quote
        context
        dateCatcall
        dateAdded
        url
        verified
        chalked
        listedForChalk
        starred
        trash
        categories
      }
    }
  }
`;

export const GET_CATCALL = gql`
  query getCatcall($id: String!) {
    getCatcall(id: $id) {
      _id
      type
      geometry {
        type
        coordinates
      }
      properties {
        quote
        context
        dateCatcall
        dateAdded
        url
        verified
        chalked
        listedForChalk
        starred
        trash
        categories
      }
    }
  }
`;

export const CREATE_CATCALL = gql`
  mutation createCatcall($catcall: CatcallInput!) {
    createCatcall(catcall: $catcall) {
      type
      geometry {
        type
        coordinates
      }
      properties {
        quote
        context
        dateCatcall
        dateAdded
        url
        verified
        chalked
        listedForChalk
        starred
        trash
        categories
      }
    }
  }
`;

export const UPDATE_CATCALL = gql`
  mutation updateCatcall($id: String!, $catcall: CatcallUpdateInput!) {
    updateCatcall(id: $id, catcall: $catcall) {
        _id
        type
      geometry {
        type
        coordinates
      }
      properties {
        quote
        context
        dateCatcall
        dateAdded
        url
        verified
        chalked
        listedForChalk
        starred
        trash
        categories
      }
    }
  }
`;

export const EMPTY_TRASH = gql`
  mutation emptyTrash {
    emptyTrash
  }
`;

export const GET_MODERATORS = gql`
  {
    getModerators {
      _id
      email
      canAdd
    }
  }
`;

export const VALIDATE_MODERATOR = gql`
query validateModerator($email: String!, $password: String!) {
  validateModerator(email: $email, password: $password) {
    _id
    email
    canAdd
    token
  }
}
`;

export const GET_MODERATOR_BY_ID = gql`
  query getModeratorById($id: String!) {
    getModeratorById(id: $id) {
      _id
      email
      canAdd
    }
  }
`;

export const CREATE_MODERATOR = gql`
  mutation createModerator($moderator: ModeratorInput!) {
    createModerator(moderator: $moderator) {
      email
      password
    }
  }
`;

export const REMOVE_MODERATOR = gql`
  mutation removeModerator($id: String!) {
    removeModerator(id: $id) {
      email
    }
  }
`;
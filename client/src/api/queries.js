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
      }
    }
  }
`;

export const GET_UNVERIFIED_CATCALLS = gql`
  {
    getUnfilteredCatcalls(condition: "verified") {
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
      }
    }
  }
`;

export const UPDATE_CATCALL = gql`
  mutation updateCatcall($id: String!, $catcall: CatcallUpdateInput!) {
    updateCatcall(id: $id, catcall: $catcall) {
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
      }
    }
  }
`;

export const VALIDATE_MODERATOR = gql`
query validateModerator($email: String!, $password: String!) {
  validateModerator(email: $email, password: $password) {
    _id
    email
    canAdd
  }
}
`;


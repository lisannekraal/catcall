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
    getUnverifiedCatcalls {
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
        trash
        verified
      }
    }
  }
`;

export const GET_TRASHED_CATCALLS = gql`
  {
    getTrashedCatcalls {
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
        trash
        verified
      }
    }
  }
`;

export const GET_TO_CHALK_CATCALLS = gql`
  {
    getToChalkCatcalls {
      _id
      type
      geometry {
        type
        coordinates
      }
      properties {
        quote
        context
        chalked
        listedForChalk
        dateCatcall
        dateAdded
        trash
        verified
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

export const VALIDATE_MODERATOR = gql`
query validateModerator($email: String!, $password: String!) {
  validateModerator(email: $email, password: $password) {
    _id
    email
    canAdd
  }
}
`;


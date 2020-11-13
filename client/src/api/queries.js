import { gql } from '@apollo/client';

export const GET_MAP_CATCALLS = gql`
  {
    getFilteredCatcalls(condition: "verified") {
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



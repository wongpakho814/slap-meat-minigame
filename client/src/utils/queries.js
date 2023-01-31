import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      timePetted
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      timePetted
    }
  }
`;

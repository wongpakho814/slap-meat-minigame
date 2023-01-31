import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    user {
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

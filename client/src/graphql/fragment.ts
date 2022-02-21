import { gql } from "@apollo/client";

export const USER_INFO = gql`
  fragment USER_INFO on User {
    id
    avatar
    username
  }
`;

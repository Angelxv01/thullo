import { gql } from "@apollo/client";

export const USER_INFO = gql`
  fragment USER_INFO on User {
    id
    avatar
    username
  }
`;

export const USER_FRIENDS = gql`
  fragment USER_FRIENDS on User {
    friends {
      ...USER_INFO
    }
  }
  ${USER_INFO}
`;

export const BOARD_BASE_INFO = gql`
  fragment BOARD_BASE_INFO on Board {
    id
    coverId
    title
  }
`;

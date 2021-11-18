import {gql} from '@apollo/client';

export const MASTER = gql`
  query MASTER($id: ID!) {
    authorizedUser {
      avatar
      username
    }
    board(id: $id) {
      title
      visibility
      members {
        role
        user {
          username
          avatar
        }
      }
    }
  }
`;

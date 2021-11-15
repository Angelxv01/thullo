import {gql} from '@apollo/client';

export const MASTER = gql`
  query MASTER($id: ID!) {
    authorizedUser {
      username
    }
    board(id: $id) {
      title
    }
  }
`;

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
      lists {
        id
        name
        cards {
          coverId
          id
          title
          labels {
            id
            text
            color
          }
        }
      }
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

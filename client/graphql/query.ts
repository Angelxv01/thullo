import {gql} from '@apollo/client';
import * as GQLTypes from '../../server/graphql/type';
export const MASTER = gql`
  query MASTER($id: ID!) {
    authorizedUser {
      id
      avatar
      username
      friends {
        username
        id
        avatar
      }
    }
    board(id: $id) {
      title
      description
      visibility
      createdAt
      lists {
        id
        name
        cards {
          coverId
          id
          title
          members {
            username
            avatar
          }
          labels {
            id
            text
            color
          }
          comments {
            id
          }
          attachments {
            title
          }
        }
      }
      members {
        role
        user {
          id
          username
          avatar
        }
      }
    }
  }
`;

export interface Data {
  board: GQLTypes.Board;
  authorizedUser: GQLTypes.User;
}

export interface Var {
  id: string;
}

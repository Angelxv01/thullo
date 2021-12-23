import { gql } from "@apollo/client";
import * as Gql from "../gqlTypes";

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
      labels {
        color
        id
        text
      }
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

export const CARD = gql`
  query CARD($id: ID!) {
    card(id: $id) {
      description
      list {
        id
      }
      coverId
      id
      title
      list {
        name
      }
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
        user {
          username
          id
          avatar
        }
        id
        text
        createdAt
      }
      attachments {
        title
        url
        createdAt
        coverId
      }
    }
  }
`;

export interface Data {
  board: Gql.Board;
  authorizedUser: Gql.User;
}

export interface Var {
  id: string;
}

export const FRIENDS_NOT_IN_BOARD = gql`
  query FRIENDS_NOT_IN_BOARD($id: ID) {
    friendsNotInBoard(id: $id) {
      username
      avatar
    }
  }
`;

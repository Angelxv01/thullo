import { gql } from "@apollo/client";
import * as Gql from "../gqlTypes";
import { USER_INFO } from "./fragment";

export const MASTER = gql`
  query MASTER($id: ID!) {
    authorizedUser {
      ...USER_INFO
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
            ...USER_INFO
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
          ...USER_INFO
        }
      }
    }
  }
  ${USER_INFO}
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
        ...USER_INFO
      }
      labels {
        id
        text
        color
      }
      comments {
        user {
          ...USER_INFO
        }
        id
        text
        createdAt
      }
      attachments {
        id
        filename
        title
        createdAt
        coverId
      }
      author {
        ...USER_INFO
      }
    }
  }
  ${USER_INFO}
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
      ...USER_INFO
    }
  }
  ${USER_INFO}
`;

export const USER_BOARD = gql`
  query USER_BOARD {
    authorizedUser {
      boards {
        id
        coverId
        title
        members {
          user {
            ...USER_INFO
          }
        }
      }
    }
  }
  ${USER_INFO}
`;

export const ME = gql`
  query ME {
    authorizedUser {
      ...USER_INFO
    }
  }
  ${USER_INFO}
`;

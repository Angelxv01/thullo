import { gql } from "@apollo/client";
import * as Gql from "../gqlTypes";

export interface Var {
  data: {
    cardId: string;
    listId: string;
  };
}

export const CHANGE_LIST = gql`
  mutation CHANGE_LIST($data: ChangeList) {
    changeList(data: $data) {
      id
      list {
        id
      }
    }
  }
`;

export interface CreateCardInput {
  cardData: {
    title?: string;
    description?: string;
    boardId?: string;
    listId?: string;
    members?: string[];
    coverId?: string;
  };
}
export const CREATE_CARD = gql`
  mutation ($cardData: CreateCardInput) {
    createCard(cardData: $cardData) {
      title
    }
  }
`;

export interface CreateListInput {
  list: {
    name: string;
    boardId: string;
  };
}

export const CREATE_LIST = gql`
  mutation ($list: CreateListInput) {
    createList(list: $list) {
      name
      id
    }
  }
`;

export interface BoardInput {
  boardData: {
    id?: string;
    title?: string;
    visibility?: Gql.Visibility;
    description?: string;
    coverId?: string;
    members?: string[];
  };
}

export const CHANGE_VISIBILITY = gql`
  mutation ($boardData: CreateBoardInput) {
    createBoard(boardData: $boardData) {
      title
      visibility
    }
  }
`;

export const CHANGE_DESCRIPTION = gql`
  mutation CHANGE_DESCRIPTION($boardData: CreateBoardInput) {
    createBoard(boardData: $boardData) {
      description
    }
  }
`;

export interface DeleteUserInput {
  data: {
    userId: string;
    boardId: string;
  };
}

export const DELETE_USER = gql`
  mutation DELETE_USER($data: DeleteUserInput) {
    deleteUser(data: $data) {
      members {
        user {
          username
        }
      }
    }
  }
`;

export interface InviteUserInput {
  data: {
    userId: string[];
    boardId: string;
  };
}

export const INVITE_USER = gql`
  mutation INVITE_USER($data: InviteUserInput) {
    inviteUser(data: $data) {
      members {
        user {
          username
        }
      }
    }
  }
`;

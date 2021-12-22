import { gql } from "@apollo/client";

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

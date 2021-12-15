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

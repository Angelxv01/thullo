import { gql } from "@apollo/client";
import * as Gql from "../gqlTypes";
import { Color } from "../gqlTypes";

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
  data: {
    id?: string;
    title?: string;
    description?: string;
    boardId?: string;
    listId?: string;
    members?: string[];
    coverId?: string;
  };
}
export const CREATE_CARD = gql`
  mutation ($data: CreateCardInput) {
    createCard(cardData: $data) {
      title
    }
  }
`;

export interface CreateListInput {
  data: {
    name: string;
    boardId: string;
  };
}

export const CREATE_LIST = gql`
  mutation ($data: CreateListInput) {
    createList(list: $data) {
      name
      id
    }
  }
`;

export interface BoardInput {
  data: {
    id?: string;
    title?: string;
    visibility?: Gql.Visibility;
    description?: string;
    coverId?: string;
    members?: string[];
  };
}

export const CHANGE_VISIBILITY = gql`
  mutation ($data: CreateBoardInput) {
    createBoard(boardData: $data) {
      title
      visibility
    }
  }
`;

export const CHANGE_DESCRIPTION = gql`
  mutation CHANGE_DESCRIPTION($data: CreateBoardInput) {
    createBoard(boardData: $data) {
      description
    }
  }
`;

export const CHANGE_TITLE = gql`
  mutation CHANGE_TITLE($data: CreateBoardInput) {
    createBoard(boardData: $data) {
      title
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

export interface ChangeListNameInput {
  data: { name: string; listId: string };
}

export const CHANGE_LIST_NAME = gql`
  mutation CHANGE_LIST_NAME($data: ChangeListNameInput) {
    changeListName(data: $data) {
      name
    }
  }
`;

export interface DeleteListInput {
  data: {
    id: string;
  };
}

export const DELETE_LIST = gql`
  mutation DELETE_LIST($data: DeleteListInput) {
    deleteList(data: $data)
  }
`;

export interface CommentInput {
  data: { commentId?: string; cardId?: string; text: string };
}

export const CREATE_COMMENT = gql`
  mutation CREATE_COMMENT($data: CreateComment) {
    createComment(commentData: $data) {
      text
      user {
        username
      }
    }
  }
`;

export interface AddMemberInput {
  data: {
    members: string[];
    cardId: string;
  };
}

export const ADD_MEMBER = gql`
  mutation ADD_MEMBER($data: AddMemberInput) {
    addMember(data: $data) {
      members {
        username
      }
    }
  }
`;

export interface AddLabelInput {
  data: {
    id: string;
    cardId: string;
  };
}

export const ADD_LABEL = gql`
  mutation ($data: AddLabelInput) {
    addLabel(data: $data) {
      id
    }
  }
`;

export interface CreateLabelInput {
  data: {
    boardId?: string;
    cardId?: string;
    text?: string;
    color?: Color;
  };
}

export const CREATE_LABEL = gql`
  mutation CREATE_LABEL($data: createLabelInput) {
    createLabel(labelData: $data) {
      text
    }
  }
`;

export interface CreateAttachmentInput {
  data: {
    cardId?: string;
    url?: string;
    title?: string;
    coverId?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    file?: File | null;
  };
}

export const CREATE_FILE_ATTACHMENT = gql`
  mutation CREATE_FILE_ATTACHMENT($data: CreateAttachmentInput) {
    createFileAttachment(data: $data) {
      title
    }
  }
`;

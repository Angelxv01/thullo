interface BaseInterface {
  id: string;
}

interface TimestampInterface {
  createdAt: Date;
  updatedAt: Date;
}

export enum Visibility {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export enum Role {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export enum Color {
  GREEN1 = 'GREEN1',
  YELLOW = 'YELLOW',
  ORANGE = 'ORANGE',
  RED = 'RED',
  BLUE1 = 'BLUE1',
  BLUE3 = 'BLUE3',
  GREEN3 = 'GREEN3',
  GRAY1 = 'GRAY1',
  GRAY2 = 'GRAY2',
  GRAY3 = 'GRAY3',
  GRAY4 = 'GRAY4',
  GRAY5 = 'GRAY5',
}

export interface User extends BaseInterface, TimestampInterface {
  username: string;
  avatar?: string;
  boards: Board[];
  friends: User[];
}

export interface Board extends BaseInterface, TimestampInterface {
  title?: string;
  visibility: Visibility;
  description?: string;
  lists: List[];
  cards: Card[];
  coverId?: string;
  members: Member[];
  label: Label[];
}

export interface Member {
  user: User;
  role: Role;
}

export interface Attachment extends BaseInterface, TimestampInterface {
  url: string;
  title: string;
  coverId: string;
}

export interface Label extends BaseInterface {
  text: string;
  color: Color;
}

export interface Card extends BaseInterface, TimestampInterface {
  title: string;
  description: string;
  list: List;
  comments: Comment[];
  labels: Label[];
  attachments: Attachment[];
}

export interface Comment extends BaseInterface, TimestampInterface {
  text: string;
  user: User;
  replies: Comment;
}

export interface List extends BaseInterface {
  name: string;
  cards: Card[];
}

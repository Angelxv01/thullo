import {IBoard} from './IBoard';
import {IAttachment, ICard} from './ICard';
import {IComment} from './IComment';
import {ILabel} from './ILabel';
import {IUser} from './IUser';
import {ComposeMongooseModel} from './Utility';

export {IBoard} from './IBoard';
export {ICard, IAttachment} from './ICard';
export {IComment} from './IComment';
export {ILabel} from './ILabel';
export {IUser} from './IUser';
export {ComposeMongooseModel} from './Utility';

export type BoardDocument = ComposeMongooseModel<IBoard>;
export type CardDocument = ComposeMongooseModel<ICard>;
export type AttachmentDocument = ComposeMongooseModel<IAttachment>;
export type CommentDocument = ComposeMongooseModel<IComment>;
export type LabelDocument = ComposeMongooseModel<ILabel>;
export type UserDocument = ComposeMongooseModel<IUser>;

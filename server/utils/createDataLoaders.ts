import DataLoader from 'dataloader';
import mongoose, { ObjectId } from 'mongoose';

import User from '../models/User';
import Board from '../models/Board';
import List from '../models/List';
import Card from '../models/Card';
import Comment from '../models/Comment';
import Label from '../models/Label';
import { BoardDocument, CommentDocument, IBoard, IComment } from '../types';

type Unknown = mongoose.Document<unknown> & {
  _id: mongoose.Types.ObjectId;
};

function cacheKeyFn(val: unknown) {
  return val;
}

const dataLoader = (Model: mongoose.Model<any>) =>
  new DataLoader(
    async (keys: readonly ObjectId[]) => {
      const result = await Model.find({ _id: { $in: keys } });
      return keys.map(key => result.find(obj => obj.id === String(key)));
    },
    { cacheKeyFn }
  );

const batchUserBoard = async (keys: readonly ObjectId[]) => {
  const data = (await Board.find({ 'members.id': keys })) as BoardDocument[];
  const results = data.map(obj => obj.toJSON()) as IBoard[];
  return keys.map(key =>
    results.filter(obj =>
      obj.members.find(value => String(value.id) === String(key))
    )
  );
};

interface UnknownWithBoard extends Unknown {
  boardId: ObjectId;
}

const boardLoader = (Model: mongoose.Model<any>) =>
  new DataLoader(
    async (keys: readonly ObjectId[]) => {
      const data = await Model.find({ boardId: { $in: keys } });
      const result = data.map(obj => obj.toJSON()) as UnknownWithBoard[];

      const out = keys.reduce((acc: UnknownWithBoard[][], key) => {
        const find = result.filter(obj => String(obj.boardId) === String(key));
        acc.push(find);
        return acc;
      }, []);
      return out;
    },
    { cacheKeyFn }
  );

const batchCommentCard = async (keys: readonly ObjectId[]) => {
  const data = await Comment.find({
    cardId: { $in: keys as unknown as ObjectId[] },
  });
  const result = data.map(obj => obj.toJSON()) as CommentDocument[];

  return keys.map(key =>
    result.filter(obj => String(obj.cardId) === String(key))
  );
};

const batchCommentParent = async (keys: readonly ObjectId[]) => {
  const data = await Comment.find({
    parentId: { $in: keys as unknown as ObjectId[] },
  });
  const result = data.map(obj => obj.toJSON());

  return keys.map(key =>
    result.filter(obj => String(obj.parentId) === String(key))
  );
};

const batchCardList = async (keys: readonly ObjectId[]) => {
  const data = await Card.find({
    listId: { $in: keys as unknown as ObjectId[] },
  });
  const result = data.map(obj => obj.toJSON());

  return keys.map(key =>
    result.filter(obj => String(obj.listId) === String(key))
  );
};

const createDataLoader = () => {
  const dataLoaders = {
    UserLoader: dataLoader(User),
    BoardLoader: dataLoader(Board),
    ListLoader: dataLoader(List),
    CardLoader: dataLoader(Card),
    CommentLoader: dataLoader(Comment),
    LabelLoader: dataLoader(Label),
    UserBoard: new DataLoader(batchUserBoard, { cacheKeyFn }),
    ListBoard: boardLoader(List),
    CardBoard: boardLoader(Card),
    LabelBoard: boardLoader(Label),
    CommentCard: new DataLoader(batchCommentCard, { cacheKeyFn }),
    CommentReply: new DataLoader(batchCommentParent, { cacheKeyFn }),
    CardList: new DataLoader(batchCardList, { cacheKeyFn }),
  } as const;

  return dataLoaders;
};

export type Dataloaders = typeof createDataLoader;

export default createDataLoader;

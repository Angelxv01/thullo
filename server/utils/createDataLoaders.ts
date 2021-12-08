import DataLoader from 'dataloader';
import mongoose, {ObjectId} from 'mongoose';

import User from '../models/User';
import Board from '../models/Board';
import List from '../models/List';
import Card from '../models/Card';
import Comment from '../models/Comment';
import Label from '../models/Label';
import {BoardDocument, IBoard} from '../../types';

type Unknown = mongoose.Document<unknown> & {
  _id: mongoose.Types.ObjectId;
};

const dataLoader = (Model: mongoose.Model<unknown>) =>
  new DataLoader(
    async (ids: readonly ObjectId[]) => {
      const result = await Model.find({_id: {$in: ids}});

      return ids.reduce((acc: (Unknown | undefined)[], id: ObjectId) => {
        // By definition obj.id is string
        const find = result.find(obj => obj.id === String(id));
        acc.push(find);
        return acc;
      }, []);
    },
    {cacheKeyFn: val => val}
  );

const batchUserBoard = async (keys: readonly ObjectId[]) => {
  const data = (await Board.find({'members.id': keys})) as BoardDocument[];
  const results = data.map(obj => obj.toJSON()) as IBoard[];
  return keys.reduce(
    (acc: IBoard[][], key) => [
      ...acc,
      results.filter(result =>
        result.members.some(member => member.id === key)
      ),
    ],
    []
  );
};

interface UnknownWithBoard extends Unknown {
  boardId: ObjectId;
}

const boardLoader = (Model: mongoose.Model<unknown>) =>
  new DataLoader(
    async (keys: readonly ObjectId[]) => {
      const data = await Model.find({boardId: {$in: keys}});
      const result = data.map(obj => obj.toJSON()) as UnknownWithBoard[];

      const out = keys.reduce((acc: UnknownWithBoard[][], key) => {
        const find = result.filter(obj => String(obj.boardId) === String(key));
        acc.push(find);
        return acc;
      }, []);
      return out;
    },
    {cacheKeyFn: val => val}
  );

// TODO: load child nodes from one parent id
// mongoose.Model, string => mongoose.find() result[]

const dataLoaders = {
  UserLoader: dataLoader(User),
  BoardLoader: dataLoader(Board),
  ListLoader: dataLoader(List),
  CardLoader: dataLoader(Card),
  CommentLoader: dataLoader(Comment),
  LabelLoader: dataLoader(Label),
  UserBoard: new DataLoader(batchUserBoard),
  ListBoard: boardLoader(List),
  CardBoard: boardLoader(Card),
};

const createDataLoader = () => {
  return dataLoaders;
};

export type Dataloaders = typeof dataLoaders;

export default createDataLoader;

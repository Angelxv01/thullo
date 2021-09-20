import DataLoader from 'dataloader';
import mongoose from 'mongoose';

import User from '../models/User';
import Board from '../models/Board';
import List from '../models/List';
import Card from '../models/Card';
import Comment from '../models/Comment';

const dataLoader = (Model: mongoose.Model<any, any, any>) =>
  new DataLoader(
    async (ids: any) => {
      const res = await Model.find({_id: {$in: ids}});
      return ids.reduce(
        (acc: any, id: any) => [
          ...acc,
          res.find((obj: any) => obj.id === id.toString()) || null,
        ],
        []
      );
    },
    {cacheKeyFn: val => val}
  );

const LoadReplies = () =>
  new DataLoader(
    async (id: any) => {
      const res = await Comment.find({parentId: id});
      return [res];
    },
    {
      cacheKeyFn: val => val,
    }
  );

export const createDataLoader = () => {
  return {
    UserLoader: dataLoader(User),
    BoardLoader: dataLoader(Board),
    ListLoader: dataLoader(List),
    CardLoader: dataLoader(Card),
    LoadReplies,
  };
};

export default createDataLoader;

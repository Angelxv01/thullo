import DataLoader from 'dataloader';
import mongoose from 'mongoose';

import User from '../models/User';
import Board from '../models/Board';
import List from '../models/List';
import Card from '../models/Card';

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

export const createDataLoader = () => {
  return {
    UserLoader: dataLoader(User),
    BoardLoader: dataLoader(Board),
    ListLoader: dataLoader(List),
    CardLoader: dataLoader(Card),
  };
};

export default createDataLoader;

import DataLoader from 'dataloader';
import mongoose from 'mongoose';
import {isArray} from 'lodash';

import User from '../models/User';
import Board from '../models/Board';
import List from '../models/List';
import Card from '../models/Card';
import Logger from '../../utils/Logger';

const dataLoader = (Model: mongoose.Model<any, any, any>) =>
  new DataLoader(
    async (ids: unknown[] | unknown) =>
      isArray(ids)
        ? await Model.find({_id: {$in: ids}})
        : await Model.findById(ids),
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

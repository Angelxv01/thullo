/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import DataLoader from 'dataloader';
import mongoose from 'mongoose';

import User from '../models/User';
import Board from '../models/Board';
import List from '../models/List';
import Card from '../models/Card';
import Comment, {IComment} from '../models/Comment';

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

const LoadReplies = new DataLoader(
  async (ids: any) => {
    const res: IComment[] = (await Comment.find({parentId: ids})) as IComment[];
    return ids.reduce(
      (acc: any, id: any) => [
        ...acc,
        res.filter(obj => obj.parentId.toString() === id),
      ],
      []
    );
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
    CommentLoader: dataLoader(Comment),
    LoadReplies,
  };
};

export default createDataLoader;

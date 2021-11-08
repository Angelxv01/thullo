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
import Comment from '../models/Comment';
import Label from '../models/Label';
import {BoardDocument, CommentDocument, IBoard} from '../../types';

const dataLoader = (Model: mongoose.Model<any, any, any>) =>
  new DataLoader(
    async (ids: any) => {
      const res = await Model.find({_id: {$in: ids}});
      return ids.reduce(
        (acc: any, id: any) => [
          ...acc,
          (res.find((obj: any) => obj.id === id.toString()) || null).toJSON(),
        ],
        []
      );
    },
    {cacheKeyFn: val => val}
  );

const LoadReplies = new DataLoader(
  async (ids: any) => {
    const res: CommentDocument[] = (await Comment.find({parentId: ids})) as CommentDocument[];
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

const batchUserBoard = async (keys: readonly string[]) => {
  const data = await Board.find({"members.id": keys}) as BoardDocument[];
  const results = data.map(obj => obj.toJSON()) as IBoard[];
  return keys.reduce(
    (acc: IBoard[][], key) => 
      [
        ...acc,
        results.filter(result => 
          result.members.some(member => member.id.toString() === key)
        )
      ],
      []
  );
}

// TODO: load child nodes from one parent id
// mongoose.Model, string => mongoose.find() result[]

export const createDataLoader = () => {
  return {
    UserLoader: dataLoader(User),
    BoardLoader: dataLoader(Board),
    ListLoader: dataLoader(List),
    CardLoader: dataLoader(Card),
    CommentLoader: dataLoader(Comment),
    LabelLoader: dataLoader(Label),
    LoadReplies,
    UserBoard: new DataLoader(batchUserBoard)
  };
};

export default createDataLoader;

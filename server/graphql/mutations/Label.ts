import {gql, ApolloError} from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose from 'mongoose';
import Logger from '../../../utils/Logger';
import Label from '../../models/Label';

import {BoardDocument, CardDocument, IUser} from '../../../types';
import {Color} from '../../../types/ILabel';

const typeDefs = gql`
  input createLabelInput {
    boardId: ID!
    text: String!
    color: Color
    cardId: ID
  }

  extend type Mutation {
    createLabel(label: createLabelInput): Label
  }
`;
const resolvers = {
  Mutation: {
    createLabel: async (
      _root: never,
      {
        label,
      }: {
        label: {
          boardId: mongoose.ObjectId;
          cardId: mongoose.ObjectId;
          text: string;
          color: Color;
        };
      },
      {
        currentUser,
        dataLoader,
      }: {
        currentUser: IUser;
        dataLoader: {[key: string]: DataLoader<unknown, unknown, unknown>};
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError('Only logged user can create a List');
      }

      let board: BoardDocument;
      let card: CardDocument | undefined;

      try {
        board = (await dataLoader.BoardLoader.load(label.boardId)) as BoardDocument;
        if (label.cardId) {
          card = (await dataLoader.CardLoader.load(label.cardId)) as CardDocument;
        }
      } catch (error) {
        Logger.info(error);
        throw new ApolloError('Invalid Board');
      }
      if (!board) {
        throw new ApolloError('Invalid Board');
      }

      const newLabel = new Label({
        text: label.text,
        color: label.color,
        boardId: label.boardId,
      });
      // board.labels.push(newLabel.id);
      card && card.labels.push(newLabel.id);

      try {
        await newLabel.save();
        await board.save();
        card && (await card.save());
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Cannot save Label');
      }

      return dataLoader.LabelLoader.load(newLabel.id);
    },
  },
};
export default {typeDefs, resolvers};

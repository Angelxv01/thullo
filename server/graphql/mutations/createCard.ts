import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose from 'mongoose';
import Logger from '../../../utils/Logger';
import Card from '../../models/Card';
import {IList} from '../../models/List';
import {IUser} from '../../models/User';

const typeDefs = gql`
  input CreateCardInput {
    title: String
    description: String
    listId: ID!
  }
  extend type Mutation {
    createCard(card: CreateCardInput): Card
  }
`;

const resolvers = {
  Mutation: {
    createCard: async (
      _root: never,
      {
        card,
      }: {
        card: {
          title: string;
          description: string;
          listId: mongoose.ObjectId;
        };
      },
      {
        currentUser,
        dataLoader,
      }: {
        currentUser: IUser | undefined;
        dataLoader: {
          UserLoader: DataLoader<unknown, unknown, unknown>;
          ListLoader: DataLoader<unknown, unknown, unknown>;
          CardLoader: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError('Only logged user can create a Board');
      }

      let list: IList;
      try {
        list = (await dataLoader.ListLoader.load(card.listId)) as IList;
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Invalid list id');
      }

      const newCard = new Card({
        title: card.title || '',
        description: card.description || '',
      });
      list.cards.push(newCard.id);

      try {
        await newCard.save();
        await list.save();
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Cannot save the Card');
      }

      return dataLoader.CardLoader.load(newCard.id);
    },
  },
};

export default {typeDefs, resolvers};

import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose from 'mongoose';
import Logger from '../../../utils/Logger';
import {IBoard} from '../../models/Board';
import Card, {Attachment, IAttachment, ICard} from '../../models/Card';
import {IList} from '../../models/List';
import {IUser} from '../../models/User';

const typeDefs = gql`
  input CreateCardInput {
    boardId: ID!
    title: String
    description: String
    listId: ID!
    coverId: String
  }
  input CreateAttachmentInput {
    cardId: ID!
    abbreviation: String!
    coverId: String
    url: String!
  }
  extend type Mutation {
    createCard(card: CreateCardInput): Card
    createAttachment(attachment: CreateAttachmentInput): Attachment
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
          boardId: mongoose.ObjectId;
          title: string;
          description: string;
          listId: mongoose.ObjectId;
          coverId: string;
        };
      },
      {
        currentUser,
        dataLoader,
      }: {
        currentUser: IUser | undefined;
        dataLoader: {
          [key: string]: DataLoader<unknown, unknown, unknown>;
        };
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError('Only logged user can create a Card');
      }

      let list: IList;
      let board: IBoard;
      try {
        list = (await dataLoader.ListLoader.load(card.listId)) as IList;
        board = (await dataLoader.BoardLoader.load(card.boardId)) as IBoard;
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Invalid list or board id');
      }

      if (
        !(
          board.owner.toString() === currentUser.id.toString() ||
          board.collaborators.find(
            collab => collab.toString() === currentUser.id.toString()
          )
        )
      ) {
        throw new ApolloError(
          'Invalid user: Only owner/collaborators can add a Card'
        );
      }

      const newCard = new Card({
        title: card.title || '',
        description: card.description || '',
        coverId: card.coverId || '',
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
    createAttachment: async (
      _root: never,
      {
        attachment,
      }: {
        attachment: {
          cardId: mongoose.ObjectId;
          url: string;
          abbreviation: string;
          coverId: string;
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
        throw new ApolloError(
          'Only logged user can add an attachment to this Card'
        );
      }

      let card;

      try {
        card = (await dataLoader.CardLoader.load(attachment.cardId)) as ICard;
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Invalid Card');
      }

      if (!card) {
        throw new ApolloError('Invalid Card');
      }

      const newAttachment: IAttachment = new Attachment({
        url: attachment.url,
        abbreviation: attachment.abbreviation,
        coverId: attachment.coverId,
      }) as IAttachment;
      card.attachments.push(newAttachment);

      try {
        await card.save();
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Unable to save the attachment');
      }
      return card.attachments.find(
        attachment => attachment.id === newAttachment.id
      );
    },
  },
};

export default {typeDefs, resolvers};

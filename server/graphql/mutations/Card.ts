import {ApolloError, gql} from 'apollo-server';
import DataLoader from 'dataloader';
import mongoose, {ObjectId} from 'mongoose';
import Logger from '../../../utils/Logger';
import Card, {Attachment} from '../../models/Card';
import {CardDocument, IUser, AttachmentDocument} from '../../../types';
import Board from '../../models/Board';
import List from '../../models/List';

interface CreateCardInput {
  id?: ObjectId;
  title?: string;
  description?: string;
  boardId: ObjectId;
  listId?: ObjectId;
  members?: ObjectId[];
  coverId?: string;
}

const typeDefs = gql`
  input CreateCardInput {
    id: ID
    title: String
    description: String
    boardId: ID
    listId: ID
    members: [ID!]
    coverId: String
  }
  input CreateAttachmentInput {
    cardId: ID!
    abbreviation: String!
    coverId: String
    url: String!
  }
  extend type Mutation {
    createCard(cardData: CreateCardInput): Card
    createAttachment(attachment: CreateAttachmentInput): Attachment
  }
`;

const resolvers = {
  Mutation: {
    createCard: async (
      _root: never,
      {cardData}: {cardData: CreateCardInput},
      {currentUser}: {currentUser: IUser | undefined}
    ) => {
      if (!currentUser) throw new ApolloError('Login to create');
      const boardExist = await Board.findById(cardData.boardId);
      const listExist = cardData.listId
        ? await List.findById(cardData.listId)
        : true;
      if (!(boardExist && listExist))
        throw new ApolloError('Invalid Board or List ID');

      const card = new Card(cardData);

      try {
        await card.save();
      } catch (err) {
        console.log((err as Error).message);
        throw err;
      }

      return card.toJSON();
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
        card = (await dataLoader.CardLoader.load(
          attachment.cardId
        )) as CardDocument;
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Invalid Card');
      }

      if (!card) {
        throw new ApolloError('Invalid Card');
      }

      const newAttachment: AttachmentDocument = new Attachment({
        url: attachment.url,
        abbreviation: attachment.abbreviation,
        coverId: attachment.coverId,
      }) as AttachmentDocument;
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

import {ApolloError, gql} from 'apollo-server';
import {ObjectId} from 'mongoose';
import Logger from '../../../utils/Logger';
import Card, {Attachment} from '../../models/Card';
import {IUser, AttachmentDocument} from '../../../types';
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
    title: String!
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
      args: {
        attachment: {
          cardId: ObjectId;
          url: string;
          title: string;
          coverId: string;
        };
      },
      {
        currentUser,
      }: {
        currentUser: IUser;
      }
    ) => {
      if (!currentUser) {
        throw new ApolloError(
          'Only logged user can add an attachment to this Card'
        );
      }

      const {cardId, ...props} = args.attachment;

      let card;

      try {
        card = await Card.findById(cardId);
        if (!card) throw new ApolloError('Invalid card');
      } catch (error) {
        Logger.error(error);
        throw new ApolloError('Invalid Card');
      }

      const newAttachment: AttachmentDocument = new Attachment(
        props
      ) as AttachmentDocument;
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

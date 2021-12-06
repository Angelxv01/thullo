import {ApolloError, gql} from 'apollo-server';
import {ObjectId} from 'mongoose';
import Logger from '../../../utils/Logger';
import Card, {Attachment} from '../../models/Card';
import {IUser, AttachmentDocument, UserDocument} from '../../../types';
import Board from '../../models/Board';
import List from '../../models/List';

interface CreateCardInput {
  title?: string;
  description?: string;
  boardId?: ObjectId;
  listId?: ObjectId;
  members?: ObjectId[];
  coverId?: string;
}

interface IChangeList {
  cardId: ObjectId;
  listId: ObjectId;
}

const typeDefs = gql`
  input CreateCardInput {
    title: String
    description: String
    boardId: ID
    listId: ID
    members: [ID!]!
    coverId: String
  }
  input CreateAttachmentInput {
    cardId: ID!
    title: String!
    coverId: String
    url: String!
  }
  input ChangeList {
    cardId: ID!
    listId: ID!
  }
  extend type Mutation {
    createCard(cardData: CreateCardInput): Card
    createAttachment(attachment: CreateAttachmentInput): Attachment
    changeList(data: ChangeList): Card
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
      await card.save();

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
    changeList: async (
      _: never,
      {data}: {data: IChangeList},
      {currentUser}: {currentUser: UserDocument}
    ) => {
      if (!currentUser) throw new ApolloError('Unauthorized');
      const cardExists = await Card.findById(data.cardId);
      const listExists = await List.findById(data.listId);
      if (
        !(cardExists && listExists) ||
        String(cardExists.boardId) !== String(listExists.boardId)
      ) {
        throw new ApolloError('Invalid operation');
      }
      cardExists.listId = listExists.id as ObjectId;
      await cardExists.save();

      return cardExists.toJSON();
    },
  },
};

export default {typeDefs, resolvers};

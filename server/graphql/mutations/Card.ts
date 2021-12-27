import { ApolloError, gql } from 'apollo-server';
import { ObjectId } from 'mongoose';
import Logger from '../../../utils/Logger';
import Card, { Attachment } from '../../models/Card';
import { IUser, AttachmentDocument, CardDocument } from '../../types';
import Board from '../../models/Board';
import List from '../../models/List';
import { Context } from '../..';
import User from '../types/User';
import { Label } from '../../models';

interface CreateCardInput {
  id?: ObjectId;
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

interface AddMemberInput {
  data: { members: ObjectId[]; cardId: ObjectId };
}

interface AddLabelInput {
  data: {
    id: ObjectId;
    cardId: ObjectId;
  };
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
  input ChangeList {
    cardId: ID!
    listId: ID!
  }
  input AddMemberInput {
    members: [ID!]!
    cardId: ID!
  }
  input AddLabelInput {
    id: ID!
    cardId: ID!
  }
  extend type Mutation {
    createCard(cardData: CreateCardInput): Card
    createAttachment(attachment: CreateAttachmentInput): Attachment
    changeList(data: ChangeList): Card
    addMember(data: AddMemberInput): Card
    addLabel(data: AddLabelInput): Card
  }
`;

const resolvers = {
  Mutation: {
    createCard: async (
      _root: never,
      { cardData }: { cardData: CreateCardInput },
      ctx: Context
    ) => {
      if (!ctx.currentUser) throw new ApolloError('Login to create');
      const boardExist = await Board.findById(cardData.boardId);
      const listExist = cardData.listId
        ? await List.findById(cardData.listId)
        : true;
      if (!(boardExist && listExist))
        throw new ApolloError('Invalid Board or List ID');
      const { id, ...newData } = cardData;

      let card: CardDocument;
      if (id) {
        card = (await Card.findByIdAndUpdate(id, newData, {
          new: true,
        })) as CardDocument;
      } else {
        card = new Card({
          ...newData,
          author: ctx.currentUser.id,
        });
        card.members.push(ctx.currentUser.id);
      }

      if (!card) return;
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

      const { cardId, ...props } = args.attachment;

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
      { data }: { data: IChangeList },
      ctx: Context
    ) => {
      if (!ctx.currentUser) throw new ApolloError('Unauthorized');
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
    addMember: async (_: never, args: AddMemberInput, ctx: Context) => {
      if (!ctx.currentUser) throw new ApolloError('Logged User Only');
      const card = await Card.findById(args.data.cardId);
      if (!card) throw new ApolloError('Invalid resource');
      const isAuthor = String(card.author) === String(ctx.currentUser.id);
      if (!isAuthor) throw new ApolloError('Unauthorized');

      const memberIds = card.members.map(member => String(member));
      const users = args.data.members.filter(
        id => memberIds.indexOf(String(id)) === -1
      );

      users.forEach(user => card.members.push(user));
      card.save();

      return card.toJSON();
    },
    addLabel: async (_: never, args: AddLabelInput, ctx: Context) => {
      if (!ctx.currentUser) throw new ApolloError('Logged User Only');
      const label = await Label.findById(args.data.id);
      const card = await Card.findById(args.data.cardId);
      if (!(card && label)) throw new ApolloError('Invalid resources');
      card.labels.push(label.id);
      await card.save();
      return card;
    },
  },
};

export default { typeDefs, resolvers };

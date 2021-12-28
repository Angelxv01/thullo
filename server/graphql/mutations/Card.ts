import { ApolloError, gql } from "apollo-server";
import { ObjectId } from "mongoose";
import Card, { Attachment } from "../../models/Card";
import { IUser, AttachmentDocument, CardDocument } from "../../types";
import Board from "../../models/Board";
import List from "../../models/List";
import { Context } from "../..";
import User from "../types/User";
import { Label } from "../../models";
import { createWriteStream } from "fs";
import { join, parse } from "path";
import { finished } from "stream/promises";

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

interface CreateAttachmentInput {
  data: {
    cardId: ObjectId;
    coverId: string;
    file: any;
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
    cardId: ID
    title: String
    coverId: String
    url: String
    file: Upload
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
    changeList(data: ChangeList): Card
    addMember(data: AddMemberInput): Card
    addLabel(data: AddLabelInput): Card
    createFileAttachment(data: CreateAttachmentInput): Attachment
  }
`;

const resolvers = {
  Mutation: {
    createCard: async (
      _root: never,
      { cardData }: { cardData: CreateCardInput },
      ctx: Context
    ) => {
      if (!ctx.currentUser) throw new ApolloError("Login to create");
      const boardExist = await Board.findById(cardData.boardId);
      const listExist = cardData.listId
        ? await List.findById(cardData.listId)
        : true;
      if (!(boardExist && listExist))
        throw new ApolloError("Invalid Board or List ID");
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
    createFileAttachment: async (_root: never, args: CreateAttachmentInput) => {
      // I receive a file and some data
      // {file: Upload, ...others}
      // Upload has properties like filename and createReadStream
      // I have to:
      // - create a unique name for the file
      // - create the pathname to save the file
      // - pipe the file

      const card = await Card.findById(args.data.cardId);
      if (!card) throw new ApolloError("Invalid resources");

      // create the resource
      const attachment = new Attachment({ cardId: args.data.cardId });

      // get the file
      const { createReadStream, filename } = await args.data.file;

      // get the file details
      const name = `${attachment.id}_${filename}`;
      const path = join("./public", name);
      attachment.filename = name;
      attachment.title = parse(name).name;

      // pipe the file
      const stream = createReadStream();
      const out = createWriteStream(path);
      stream.pipe(out);
      await finished(stream);

      // after making sure the file is saved, save the resource
      await attachment.save();
      return attachment;
    },
    changeList: async (
      _: never,
      { data }: { data: IChangeList },
      ctx: Context
    ) => {
      if (!ctx.currentUser) throw new ApolloError("Unauthorized");
      const cardExists = await Card.findById(data.cardId);
      const listExists = await List.findById(data.listId);
      if (
        !(cardExists && listExists) ||
        String(cardExists.boardId) !== String(listExists.boardId)
      ) {
        throw new ApolloError("Invalid operation");
      }
      cardExists.listId = listExists.id as ObjectId;
      await cardExists.save();

      return cardExists.toJSON();
    },
    addMember: async (_: never, args: AddMemberInput, ctx: Context) => {
      if (!ctx.currentUser) throw new ApolloError("Logged User Only");
      const card = await Card.findById(args.data.cardId);
      if (!card) throw new ApolloError("Invalid resource");
      const isAuthor = String(card.author) === String(ctx.currentUser.id);
      if (!isAuthor) throw new ApolloError("Unauthorized");

      const memberIds = card.members.map((member) => String(member));
      const users = args.data.members.filter(
        (id) => memberIds.indexOf(String(id)) === -1
      );

      users.forEach((user) => card.members.push(user));
      card.save();

      return card.toJSON();
    },
    // !!! This mutation is a toggle, not an add
    addLabel: async (_: never, args: AddLabelInput, ctx: Context) => {
      if (!ctx.currentUser) throw new ApolloError("Logged User Only");
      const label = await Label.findById(args.data.id);
      const card = await Card.findById(args.data.cardId);
      if (!(card && label)) throw new ApolloError("Invalid resources");

      const isLabelInCard = card.labels.find(
        (label) => String(label) === String(args.data.id)
      );
      if (isLabelInCard) {
        card.labels = card.labels.filter(
          (label) => String(label) !== String(args.data.id)
        );
      } else {
        card.labels.push(label.id);
      }
      await card.save();
      return card;
    },
  },
};

export default { typeDefs, resolvers };

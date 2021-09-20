import {gql} from 'apollo-server';

const typeDefs = gql`
  type Attachment {
    url: String!
    created: String!
    abbreviation: String
    coverId: String
  }
  type Label {
    id: ID!
    value: String!
    color: Color!
  }
  type Comment {
    id: ID!
    created: String!
    edited: String
    text: String
    user: User!
  }
  type Card {
    id: ID!
    title: String
    description: String
    assignedTo: [User!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    # labels: [Label!]!
    # attachments: [Attachment!]!
    # coverId: String
    # comments: [Comment!]!
  }
`;

const resolvers = {};

export default {typeDefs, resolvers};

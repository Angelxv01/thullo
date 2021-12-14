import React from 'react';
import { Gql } from '../../../../types';
import { Avatar, Flex } from '../common';

const Avatars = ({
  members,
  children,
}: {
  members: Gql.User[];
  children?: React.ReactChild;
}) => (
  <Flex space="0.5rem">
    {members.map(({ username, avatar }) => (
      <Avatar key={username} username={username} id={avatar} />
    ))}
    {children}
  </Flex>
);

export default Avatars;

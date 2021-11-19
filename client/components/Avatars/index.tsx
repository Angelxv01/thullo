import React from 'react';
import {User} from '../../../server/graphql/type';
import {Avatar, Flex} from '../common';

const Avatars = ({
  members,
  children,
}: {
  members: User[];
  children?: React.ReactChild;
}) => (
  <Flex space="0.5rem">
    {members.map(({username, avatar}) => (
      <Avatar key={username} username={username} id={avatar} />
    ))}
    {children}
  </Flex>
);

export default Avatars;

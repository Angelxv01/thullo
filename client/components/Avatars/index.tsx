import React from 'react';
import {IUser} from '../../../types';
import {Avatar, Flex} from '../common';

const Avatars = ({
  members,
  children,
}: {
  members: IUser[];
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

import React from 'react';
import {IUser} from '../../../types';
import {Avatar, Flex} from '../common';

const Avatars = ({
  members,
  children,
}: {
  members: {user: IUser}[];
  children?: React.ReactChild;
}) => (
  <Flex space="0.5rem">
    {members.map(({user}) => (
      <Avatar key={user.username} username={user.username} id={user.avatar} />
    ))}
    {children}
  </Flex>
);

export default Avatars;

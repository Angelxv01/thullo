import React from 'react';
import {Avatar, Flex, Text} from '../common';
import * as GQLTypes from '../../../server/graphql/type';

const User = ({user}: {user: GQLTypes.User}) => {
  return (
    <Flex space="0.75em" style={{alignItems: 'center'}}>
      <Avatar id={user.avatar} username={user.username} />
      <Text>{user.username}</Text>
    </Flex>
  );
};

export default User;

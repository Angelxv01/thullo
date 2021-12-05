import React from 'react';
import {useTheme} from 'styled-components';
import {InputGroup, Flow, Text, Button, Icon, Flex} from '../common';
import User from '../User';
import StyledFriendFlow from './StyledFriendFlow';
import * as GQLTypes from '../../../server/graphql/type';

const InviteFriend = ({friends}: {friends: GQLTypes.User[]}) => {
  const theme = useTheme();
  return (
    <Flow space="1em">
      <Flow space="1px">
        <Text color="GRAY2">Invite to Board</Text>
        <Text color="GRAY3" fontFamily={theme.font.family.secondary}>
          Search users you want to invite to
        </Text>
      </Flow>
      <InputGroup props={{placeholder: 'User...'}} width="100%">
        <Button.Squared>
          <Icon.Search />
        </Button.Squared>
      </InputGroup>
      <StyledFriendFlow>
        {friends.map(friend => (
          <Flex key={friend.id} className="flex">
            <User user={friend} />
          </Flex>
        ))}
      </StyledFriendFlow>
      <Flow style={{textAlign: 'center', marginTop: '2em'}}>
        <Button.Colored style={{padding: '0.75em 1em'}}>Invite</Button.Colored>
      </Flow>
    </Flow>
  );
};

export default InviteFriend;

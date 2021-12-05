import React from 'react';
import styled, {useTheme} from 'styled-components';
import {Button, Flow, Icon, Text, InputGroup, Flex} from '../common';
import * as GQLTypes from '../../../server/graphql/type';

import Toggle from '../Toggle';
import User from '../User';

const InviteFriendModal = ({friends}: {friends: GQLTypes.User[]}) => {
  const theme = useTheme();
  const ToggleStyle = {
    style: {
      marginTop: '1em',
      zIndex: theme.z.POPUP,
      backgroundColor: `hsl(${theme.color.WHITE})`,
      minWidth: '23em',
      padding: '0.75em 1em',
      border: '1px solid #E0E0E0',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
      borderRadius: theme.border.radius[2],
    },
  };
  return (
    <Toggle props={ToggleStyle}>
      {/* Button */}
      <Button.Squared>
        <Icon.Add />
      </Button.Squared>

      {/* Modal */}
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
          <Button.Colored style={{padding: '0.75em 1em'}}>
            Invite
          </Button.Colored>
        </Flow>
      </Flow>
    </Toggle>
  );
};

const StyledFriendFlow = styled(Flow)`
  border: 1px solid #e0e0e0;
  padding: 1em;
  border-radius: ${({theme}) => theme.border.radius[1]};
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.1));

  .flex {
    justify-content: space-between;
    align-items: center;
  }
`;

export default InviteFriendModal;

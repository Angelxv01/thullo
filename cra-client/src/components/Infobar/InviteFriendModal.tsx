import React from 'react';
import {useTheme} from 'styled-components';
import {Button, Icon} from '../common';
import * as GQLTypes from '../../../server/graphql/type';

import Toggle from '../Toggle';
import InviteFriend from '../InviteFriend';

const InviteFriendModal = ({friends}: {friends: GQLTypes.User[]}) => {
  const theme = useTheme();
  const ToggleStyle = {
    style: {
      marginTop: '1em',
      zIndex: theme.z.HEADER_POPUP,
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
      <InviteFriend friends={friends} />
    </Toggle>
  );
};

export default InviteFriendModal;

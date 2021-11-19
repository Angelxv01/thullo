/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {useQuery} from '@apollo/client';
import {MASTER} from '../../query';
import {Button, Flex, Icon, Text} from '../common';

import VisibilityBadge from './Badge';
import Avatars from '../Avatars';
import StyledInfobar from './StyledInfobar';
import {IUser} from '../../../types';

const Infobar = () => {
  const ctx = useQuery(MASTER, {
    fetchPolicy: 'cache-only',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });

  return (
    <StyledInfobar>
      {/* Left hand side */}
      <Flex>
        <VisibilityBadge visibility={ctx.data.board.visibility} />
        <Avatars
          members={ctx.data.board.members.map(({user}: {user: IUser}) => user)}
        >
          {/* Append this at the end of the 'mapping' */}
          <Button.Squared>
            <Icon.Add />
          </Button.Squared>
        </Avatars>
      </Flex>
      {/* Right hand side */}
      <Button.Icon>
        <Icon.MoreHoriz />
        <Text>Show Menu</Text>
      </Button.Icon>
    </StyledInfobar>
  );
};

export default Infobar;

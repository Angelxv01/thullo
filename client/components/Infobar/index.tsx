/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {useQuery} from '@apollo/client';
import {Data, MASTER, Var} from '../../graphql/query';
import {Button, Flex, Icon, Relative, Text} from '../common';

import Avatars from '../Avatars';
import StyledInfobar from './StyledInfobar';
import * as GQLTypes from '../../../server/graphql/type';
import Menu from '../Menu';
import useVisibility from '../../hooks/useVisiblity';
import InviteFriendModal from './InviteFriendModal';
import VisibilityModal from './VisibilityModal';

const Infobar = () => {
  const ctx = useQuery<Data, Var>(MASTER, {
    fetchPolicy: 'cache-only',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });

  const [visibility, setVisibility] = useVisibility();

  if (!ctx.data) return null;

  return (
    <Relative>
      <StyledInfobar>
        {/* Left hand side */}
        <Flex>
          <VisibilityModal visibility={ctx.data.board.visibility} />
          <Avatars
            members={ctx.data.board.members.map(
              ({user}: {user: GQLTypes.User}) => user
            )}
          >
            {/* Append this at the end of the 'mapping' */}
            <InviteFriendModal friends={ctx.data.authorizedUser.friends} />
          </Avatars>
        </Flex>
        {/* Right hand side */}
        <div onClick={setVisibility}>
          <Button.Icon>
            <Icon.MoreHoriz />
            <Text>Show Menu</Text>
          </Button.Icon>
        </div>
      </StyledInfobar>
      {visibility && <Menu toggle={setVisibility} />}
    </Relative>
  );
};

export default Infobar;

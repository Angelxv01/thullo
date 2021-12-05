/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {useQuery} from '@apollo/client';
import {Data, MASTER, Var} from '../../query';
import {Button, Flex, Icon, Relative, Text} from '../common';

import VisibilityBadge from './Badge';
import Avatars from '../Avatars';
import StyledInfobar from './StyledInfobar';
import * as GQLTypes from '../../../server/graphql/type';
import Toggle from '../Toggle';
import {useTheme} from 'styled-components';
import VisibilityCard from '../VisibilityCard';
import Menu from '../Menu';
import useVisibility from '../../hooks/useVisiblity';
import InviteFriendModal from './InviteFriendModal';

const Infobar = () => {
  const ctx = useQuery<Data, Var>(MASTER, {
    fetchPolicy: 'cache-only',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });

  const theme = useTheme();

  const [visibility, setVisibility] = useVisibility();

  if (!ctx.data) return null;

  return (
    <Relative>
      <StyledInfobar>
        {/* Left hand side */}
        <Flex>
          <Toggle
            props={{
              style: {
                marginTop: '1em',
                backgroundColor: 'white',
                zIndex: theme.z.POPUP,
                minWidth: '20em',
                padding: '1em',
                border: '1px solid #E0E0E0',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                borderRadius: theme.border.radius[2],
              },
            }}
          >
            <VisibilityBadge visibility={ctx.data.board.visibility} />
            <VisibilityCard />
          </Toggle>
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

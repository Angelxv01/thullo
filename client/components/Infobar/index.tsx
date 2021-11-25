/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {useQuery} from '@apollo/client';
import {MASTER} from '../../query';
import {Button, Flex, Flow, Icon, Text} from '../common';

import VisibilityBadge from './Badge';
import Avatars from '../Avatars';
import StyledInfobar from './StyledInfobar';
import {IUser} from '../../../types';
import Toggle from '../Toggle';
import {useTheme} from 'styled-components';
import {StyledInfoLabel} from '../common/InfoLabel';

const Infobar = () => {
  const ctx = useQuery(MASTER, {
    fetchPolicy: 'cache-only',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });

  const theme = useTheme();

  return (
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
          <Flow space="0.5em">
            <Flow space={theme.font.size[1]}>
              <Text color="GRAY2" fontWeight="600">
                Visibility
              </Text>
              <Text
                color="GRAY3"
                fontSize={theme.font.size[200]}
                lineHeight={theme.lineHeight[0]}
              >
                Choose who can see to this board.
              </Text>
            </Flow>
            <Flow
              space="0.25em"
              style={{
                padding: '1em',
                fontFamily: theme.font.family.secondary,
              }}
            >
              <StyledInfoLabel color="GRAY2" fontSize={theme.font.size[300]}>
                <Icon.Public />
                <Text fontWeight="bold">Public</Text>
              </StyledInfoLabel>
              <Text color="GRAY3" fontSize={theme.font.size[200]}>
                Anyone on the internet can see this.
              </Text>
            </Flow>
            <Flow
              space="0.25em"
              style={{
                padding: '1em',
                fontFamily: theme.font.family.secondary,
              }}
            >
              <StyledInfoLabel color="GRAY2" fontSize={theme.font.size[300]}>
                <Icon.Lock />
                <Text fontWeight="bold">Private</Text>
              </StyledInfoLabel>
              <Text color="GRAY3" fontSize={theme.font.size[200]}>
                Only board members can see this
              </Text>
            </Flow>
          </Flow>
        </Toggle>
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

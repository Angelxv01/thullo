/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { useQuery } from '@apollo/client';
import { MASTER } from '../../graphql/query';
import useInput from '../../hooks/useInput';
import { useTheme } from 'styled-components';

import { Avatar, Button, Flex, Icon, InputGroup, Text } from '../common';
import StyledNavigation from './StyledNavigation';
import Separator from './Separator';

const Navigation = () => {
  const ctx = useQuery(MASTER, {
    fetchPolicy: 'cache-only',
    variables: { id: '6182d8c9bba2b2dfab68119d' },
  });
  const searchController = useInput('text');
  const theme = useTheme();

  if (ctx.loading || !ctx.data) return null;

  return (
    <StyledNavigation>
      {/* <Logo /> */}

      {/* Board Name + Back to boards */}
      <Flex space="2rem" style={{ alignItems: 'inherit' }}>
        <Text fontSize={theme.font.size[600]} lineHeight={theme.lineHeight[3]}>
          {ctx.data.board.title}
        </Text>
        <Separator />
        <Button.Icon>
          <Icon.Apps />
          <Text>All boards</Text>
        </Button.Icon>
      </Flex>

      {/* Search bar */}
      <InputGroup
        props={{
          ...searchController,
          placeholder: 'Keyword...',
        }}
        width="24rem"
      >
        <Button.Colored style={{ padding: '0.75em 1.5em' }}>
          Search
        </Button.Colored>
      </InputGroup>

      {/* User */}
      <Flex style={{ alignItems: 'inherit' }}>
        <Avatar
          id={ctx.data.authorizedUser.avatar || ''}
          username={ctx.data.authorizedUser.username}
        />
        <Text
          fontFamily={theme.font.family.secondary}
          fontWeight="bold"
          lineHeight={theme.lineHeight[0]}
        >
          {ctx.data.authorizedUser.username}
        </Text>
        <Icon.ArrowDropDown />
      </Flex>
    </StyledNavigation>
  );
};

export default Navigation;

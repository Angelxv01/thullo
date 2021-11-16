/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Flex} from './style/Utils';
import {useQuery} from '@apollo/client';
import {MASTER} from './query';
import Logo from './assets/Logo.svg';
import Text from './components/common/Text';
import * as Button from './components/common/Button';
import * as Icon from './style/Icons';
import {useTheme} from 'styled-components';
import InputGroup from './components/common/InputGroup';
import useInput from './hooks/useInput';
import Avatar from './components/common/Avatar';

const App = () => {
  const searchController = useInput('text');
  const ctx = useQuery(MASTER, {variables: {id: '6182d8c9bba2b2dfab68119d'}});
  const theme = useTheme();

  if (ctx.loading || !ctx.data) return null;

  // console.log(ctx.data.authorizedUser.avatar);

  return (
    <Flex style={{alignItems: 'center'}}>
      <Logo />
      <Text fontSize={theme.font.size[600]} lineHeight={theme.lineHeight[3]}>
        {ctx.data.board.title}
      </Text>
      <Button.Icon>
        <Icon.Apps />
        <Text>All boards</Text>
      </Button.Icon>
      <InputGroup
        props={{...searchController, placeholder: 'Keyword...'}}
        width="24rem"
      >
        <Button.Colored>Search</Button.Colored>
      </InputGroup>
      <Avatar id={ctx.data.authorizedUser.avatar || ''} />
      <Text
        fontFamily={theme.font.family.secondary}
        fontWeight="bold"
        lineHeight={theme.lineHeight[0]}
      >
        {ctx.data.authorizedUser.username}
      </Text>
      <Icon.ArrowDropDown />
    </Flex>
  );
};

export default App;

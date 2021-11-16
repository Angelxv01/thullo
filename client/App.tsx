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

const App = () => {
  const searchController = useInput('text');
  const ctx = useQuery(MASTER, {variables: {id: '6182d8c9bba2b2dfab68119d'}});
  const theme = useTheme();

  return (
    <Flex style={{alignItems: 'flex-end'}}>
      <Logo />
      <Text fontSize={theme.font.size[600]}>
        {ctx.data && ctx.data.board.title}
      </Text>
      <Button.Icon>
        <Icon.Apps />
        <Text>All boards</Text>
      </Button.Icon>
      <InputGroup
        props={{...searchController, placeholder: 'Keyword...'}}
        width="28rem"
      >
        <Button.Colored>Search</Button.Colored>
      </InputGroup>
    </Flex>
  );
};

export default App;

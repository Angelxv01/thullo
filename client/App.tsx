/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Flex} from './style/Utils';
import {useQuery} from '@apollo/client';
import {MASTER} from './query';

const App = () => {
  const ctx = useQuery(MASTER, {variables: {id: '6182d8c9bba2b2dfab68119d'}});
  if (ctx.data) {
    console.log(ctx.data.board.title);
    console.log(ctx.data.authorizedUser.username);
  }

  return (
    <Flex style={{alignItems: 'flex-end'}}>
      {ctx.data && ctx.data.board.title}
    </Flex>
  );
};

export default App;

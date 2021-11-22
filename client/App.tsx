/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import Navigation from './components/Navigation';
import {Container} from './components/common';
import {useQuery} from '@apollo/client';
import {MASTER} from './query';
import Infobar from './components/Infobar';
// import {useTheme} from 'styled-components';
import * as GQL from '../server/graphql/type';
import Kanban from './components/Kanban';

const App = () => {
  // const theme = useTheme();
  const ctx = useQuery(MASTER, {
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  }) as {data: {board: GQL.Board}};

  if (!ctx.data) return null;
  // console.log(ctx.data);

  return (
    <Container>
      <Navigation />
      <Infobar />
      {/* Board */}
      <Kanban />
    </Container>
  );
};

export default App;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import Navigation from './components/Navigation';
import {Container} from './components/common';
import {useQuery} from '@apollo/client';
import {Data, MASTER, Var} from './graphql/query';
import Infobar from './components/Infobar';
// import {useTheme} from 'styled-components';
import Kanban from './components/Kanban';

const App = () => {
  // const theme = useTheme();
  const ctx = useQuery<Data, Var>(MASTER, {
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });

  if (!ctx.data) return null;
  // console.log(ctx.data);

  return (
    <Container>
      <Navigation />
      <Infobar />
      <Kanban />
    </Container>
  );
};

export default App;

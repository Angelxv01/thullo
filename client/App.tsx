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

const App = () => {
  const ctx = useQuery(MASTER, {variables: {id: '6182d8c9bba2b2dfab68119d'}});

  if (!ctx.data) return null;

  return (
    <Container>
      <Navigation />
      {/* Infobar */}
      <Infobar />
    </Container>
  );
};

export default App;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {Flex} from './style/Utils';
import useInput from './hooks/useInput';

const App = () => {
  const input = useInput('text');
  return <Flex style={{alignItems: 'flex-end'}}></Flex>;
};

export default App;

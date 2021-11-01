/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Label from './components/common/Label';
import {Flex} from './style/Utils';

const App = () => {
  return (
    <Flex>
      <p>This is styled one</p>
      <Label color="YELLOW">Concept</Label>
    </Flex>
  );
};

export default App;

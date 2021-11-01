/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import TextArea from './components/TextArea';
import UseTextArea from './hooks/UseTextArea';

const App = () => {
  const textArea = UseTextArea();
  return (
    <div>
      <p>This is styled one</p>
      {/* <TextArea {...textArea} placeholder="Enter a title for this card..." /> */}
    </div>
  );
};

export default App;

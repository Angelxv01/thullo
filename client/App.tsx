import React from 'react';
import TextArea from './components/TextArea';
import UseTextArea from './hooks/UseTextArea';

const App = () => {
  const textArea = UseTextArea();
  return (
    <div>
      <p>This is styled one</p>
      <TextArea {...textArea} />
    </div>
  );
};

export default App;

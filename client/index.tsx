import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {ThemeProvider} from 'styled-components';
import Global from './style/global';
import Theme from './style/theme';

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <Global />
    <App />
  </ThemeProvider>,
  document.querySelector('#root')
);

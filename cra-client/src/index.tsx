import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from '@apollo/client';

import App from './App';
import {ThemeProvider} from 'styled-components';
import Global from './style/global';
import Theme from './style/theme';
import client from './utils/apolloClient';

ReactDOM.render(
  <ThemeProvider theme={Theme}>
    <Global />
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>,
  document.querySelector('#root')
);

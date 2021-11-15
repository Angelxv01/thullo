import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({uri: 'http://localhost:4000/'});

const ctx = setContext((_, {headers}) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuZ2VsIiwiaWQiOiI2MTgyOTA0N2I4ZmVmNDYxNTNkZjQxNDIiLCJpYXQiOjE2MzY5OTI2MjR9.tlRa7J396AHr98KXHAdhFvZeFGQdVAk6n8-EdWguHdg';
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      authorization: 'bearer ' + token,
    },
  };
});

const client = new ApolloClient({
  link: ctx.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

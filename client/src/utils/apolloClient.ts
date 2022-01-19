import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { loadState } from "./localStorage";

const uploadLink = createUploadLink({
  uri: "/graphql",
});

const ctx = setContext((_, { headers }) => {
  const token = loadState("token");
  if (!token) return { headers };
  return {
    headers: {
      ...headers,
      authorization: `bearer ${token.value}`,
    },
  };
});

const client = new ApolloClient({
  link: ctx.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;

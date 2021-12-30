import { useQuery } from "@apollo/client";
import * as Gql from "../gqlTypes";
import { ME } from "../graphql/query";

const useUser = () => {
  const { data: ctx } = useQuery<{ authorizedUser: Gql.User }>(ME, {
    fetchPolicy: "cache-and-network",
  });

  if (!ctx) return undefined;
  return ctx.authorizedUser;
};

export default useUser;

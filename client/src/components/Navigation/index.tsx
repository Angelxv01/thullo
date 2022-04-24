import { ChangeEvent } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Data, MASTER, Var } from "../../graphql/query";
import useInput from "../../hooks/useInput";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import { Avatar, Icon } from "../common";
import * as Gql from "../../gqlTypes";
import { BoardInput, CHANGE_TITLE } from "../../graphql/mutation";
import { useNavigate, useParams } from "react-router-dom";
import { removeState } from "../../utils/localStorage";
import useUser from "../../hooks/useUser";

const Navigation = () => {
  const { id } = useParams();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const ctx = id
    ? useQuery<Data, Var>(MASTER, {
        fetchPolicy: "cache-and-network",
        variables: { id },
      })
    : undefined;
  const logout = () => {
    removeState("token");
    apolloClient.resetStore();
    navigate("../login");
  };
  const user = useUser();
  const searchController = useInput("text");
  const [changeTitle] = useMutation<{ createBoard: Gql.Board }, BoardInput>(
    CHANGE_TITLE,
    {
      refetchQueries: [{ query: MASTER, variables: { id } }],
    }
  );

  const handleTitleChange = (e: ChangeEvent<HTMLParagraphElement>) =>
    changeTitle({
      variables: {
        data: {
          title: e.target.outerText,
          id,
        },
      },
    });

  return (
    <div className="flex justify-between xl:grid shadow-lg py-4 px-8 xl:gap-8 items-center xl:grid-cols-12">
      <Logo className="cursor-pointer" onClick={() => navigate("/")} />
      {id && (
        <div className="hidden lg:flex items-center gap-6 col-start-3 col-span-4">
          <h1
            className="text-lg focus:outline-none"
            onBlur={handleTitleChange}
            contentEditable
            suppressContentEditableWarning
          >
            {ctx?.data?.board.title}
          </h1>
          <hr className="w-px h-8 bg-gray-300" />
          <button className="text-sm border-2 border-blue-dark py-1 px-3 rounded-lg inline-flex items-center gap-2 text-gray-900">
            <Icon.Apps />
            All Boards
          </button>
        </div>
      )}
      <div className="hidden w-96 rounded-lg p-1 text-sm shadow xl:inline-flex justify-self-end col-span-3 col-start-8">
        <input
          {...searchController}
          placeholder="Keyword"
          className="flex-1 border-0 focus:ring-blue-dark focus:ring-1 rounded-lg px-3 py-1"
        />
        <button className="border-2 border-blue-dark px-4 py-1 rounded-lg text-gray-900 font-semibold ml-1 h-full">
          Search
        </button>
      </div>
      {user && (
        <div className="flex items-center col-span-2 justify-self-end">
          <Avatar id={user.avatar} username={user.username || ""} />
          <p className="font-accent font-semibold text-sm ml-2">
            {user.username}
          </p>
          <Icon.Logout
            onClick={logout}
            className="!text-xl material-icons ml-4 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};
export default Navigation;

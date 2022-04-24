import { useEffect, useState } from "react";
import User from "../User";
import * as Gql from "../../gqlTypes";
import { useLazyQuery } from "@apollo/client";
import { Var, FRIENDS_NOT_IN_BOARD } from "../../graphql/query";
import { useParams } from "react-router-dom";
import { Button as TestButton } from "../../test/Button";

const InviteFriend = ({ action }: { action: (ids: string[]) => void }) => {
  const { id } = useParams();
  if (!id) return null;

  const [selected, setSelected] = useState<string[]>([]);
  const [getFriends, { data, loading, error }] = useLazyQuery<
    { friendsNotInBoard: Gql.User[] },
    Var
  >(FRIENDS_NOT_IN_BOARD, { variables: { id } });

  useEffect(() => {
    if (!data) {
      getFriends();
    }
  }, []);

  const handleSelectUser = (id: string) =>
    setSelected(
      selected.indexOf(id) > -1
        ? selected.filter((obj) => obj !== id)
        : [...selected, id]
    );

  const clickHandler = () => {
    action(selected);
  };

  if (!data || !data.friendsNotInBoard || loading || error) return null;
  return (
    <div className="absolute bg-white z-10 mt-4 shadow-lg px-3 py-2 rounded-lg">
      <div>
        <p>Invite to Board</p>
        <p>Search users you want to invite to</p>
      </div>
      <div className="max-w-sm rounded-lg p-1 text-sm shadow inline-flex space-x-1 mt-4">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 border-0 focus:ring-blue-dark focus:ring-1 rounded-lg px-3 py-1"
        />
        <TestButton>Search</TestButton>
      </div>
      <div className="rounded-lg border-gray-300 border-2 my-4 py-2 px-1">
        {data.friendsNotInBoard.length === 0 && (
          <p>All your friends are here!</p>
        )}
        {data.friendsNotInBoard.map((friend) => (
          <User
            key={friend.id}
            user={friend}
            selected={selected.indexOf(friend.id) > -1}
            onClick={() => handleSelectUser(friend.id)}
          />
        ))}
      </div>
      <TestButton onClick={clickHandler}>Invite</TestButton>
    </div>
  );
};

export default InviteFriend;

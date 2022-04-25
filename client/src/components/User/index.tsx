import { Avatar } from "../common";
import * as Gql from "../../gqlTypes";

const User = ({
  user,
  selected,
  onClick,
}: {
  user: Gql.User;
  selected?: boolean;
  onClick?: () => void;
}) => {
  const baseClass = "rounded-lg flex gap-2 items-center p-2 cursor-pointer";
  const selectedStyle = selected ? "bg-blue-dark text-white" : "";
  return (
    <div onClick={onClick} className={`${baseClass} ${selectedStyle}`}>
      <Avatar id={user.avatar} username={user.username} />
      <p className="text-tiny">{user.username}</p>
    </div>
  );
};

export default User;

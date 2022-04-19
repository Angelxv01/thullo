import React from "react";
import * as Gql from "../../gqlTypes";
import { Avatar } from "../common";

const Avatars = ({ members }: { members: Gql.User[] }) => (
  <div className="flex items-center space-x-2">
    {members.map(({ username, avatar }) => (
      <Avatar key={username} username={username} id={avatar} />
    ))}
  </div>
);

export default Avatars;

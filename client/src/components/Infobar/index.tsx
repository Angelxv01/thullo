import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Data, MASTER, Var } from "../../graphql/query";
import { Button, Flex, Icon, Relative, Text } from "../common";

import Avatars from "../Avatars";
import StyledInfobar from "./StyledInfobar";
import * as Gql from "../../gqlTypes";
import Menu from "../Menu";
import useVisibility from "../../hooks/useVisiblity";
import InviteFriendModal from "./InviteFriendModal";
import VisibilityModal from "./VisibilityModal";
import { useParams } from "react-router-dom";
import VisibilityCard from "../VisibilityCard";
import { BoardInput, CHANGE_VISIBILITY } from "../../graphql/mutation";

const Infobar = () => {
  const { id } = useParams();
  if (!id) return null;
  const ctx = useQuery<Data, Var>(MASTER, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });
  const boardVisibility = ctx.data?.board.visibility;
  const [changeVisibility] = useMutation<{ creteBoard: Gql.Board }, BoardInput>(
    CHANGE_VISIBILITY,
    {
      refetchQueries: [
        {
          query: MASTER,
          variables: { id },
        },
      ],
    }
  );

  const handleChangeVisibility = (visibility: Gql.Visibility) => {
    changeVisibility({ variables: { data: { id, visibility } } });
    setVisible();
  };

  const [visible, setVisible] = useVisibility();

  if (!ctx.data) return null;

  return (
    <div className="relative inline-flex items-center py-4 px-8 justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={setVisible}
            className="text-sm border-2 border-blue-dark py-1 px-3 rounded-lg hidden xl:inline-flex items-center gap-2 text-gray-900 capitalize"
          >
            {boardVisibility === Gql.Visibility.PRIVATE ? (
              <Icon.Lock />
            ) : (
              <Icon.Public />
            )}
            {ctx.data.board.visibility.toLowerCase()}
          </button>
          {visible && (
            <div className="absolute mt-4 space-y-4 w-72 bg-white z-10 px-3 py-2 rounded-lg shadow-lg border border-gray-300">
              <div>
                <p className="text-sm font-bold">Visibility</p>
                <p className="text-sm">Choose who can see to this board.</p>
              </div>
              <div
                className="p-3 rounded-lg hover:bg-gray-500/20 cursor-pointer"
                onClick={() => handleChangeVisibility(Gql.Visibility.PUBLIC)}
              >
                <p className="text-sm font-bold">Public</p>
                <p className="text-sm">Anyone on the internet can see this.</p>
              </div>
              <div
                className="p-3 rounded-lg hover:bg-gray-500/20 cursor-pointer"
                onClick={() => handleChangeVisibility(Gql.Visibility.PRIVATE)}
              >
                <p className="text-sm font-bold">Private</p>
                <p className="text-sm">Only board members can see this</p>
              </div>
            </div>
          )}
        </div>
        <Avatars
          members={ctx.data.board.members.map(
            ({ user }: { user: Gql.User }) => user
          )}
        />
        <Icon.Add className="material-icons place-items-center aspect-square h-8 border-2 border-blue-dark rounded-lg !text-xl text-center cursor-pointer" />
      </div>
      <button className="text-sm border-2 border-blue-dark py-1 px-3 rounded-lg hidden xl:inline-flex items-center gap-2 text-gray-900">
        <Icon.MoreHoriz className="material-icons !text-xl !leading-3" />
        Menu
      </button>
    </div>
  );
};

// {/* <Relative>
//       <StyledInfobar>
//         {/* Left hand side */}
//         <Flex>
//           <VisibilityModal visibility={ctx.data.board.visibility} />
//           <Avatars
//             members={ctx.data.board.members.map(
//               ({ user }: { user: Gql.User }) => user
//             )}
//           />
//           <InviteFriendModal />
//         </Flex>
//         {/* Right hand side */}
//         <Button.Icon onClick={setVisibility}>
//           <Icon.MoreHoriz />
//           <Text>Show Menu</Text>
//         </Button.Icon>
//       </StyledInfobar>
//       {visibility && <Menu toggle={setVisibility} />}
//     </Relative> */}
export default Infobar;

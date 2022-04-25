import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import styled, { css, useTheme } from "styled-components";
import { Data, Var, MASTER, FRIENDS_NOT_IN_BOARD } from "../../graphql/query";
import {
  Button,
  Flex,
  Icon,
  Absolute,
  Text,
  Flow,
  Avatar,
  TextArea,
} from "../common";
import InfoLabel from "../common/InfoLabel";
import * as Gql from "../../gqlTypes";
import useTextArea from "../../hooks/useTextArea";
import User from "../User";
import {
  CHANGE_DESCRIPTION,
  DeleteUserInput,
  DELETE_USER,
} from "../../graphql/mutation";
import useVisibility from "../../hooks/useVisiblity";
import useContent from "../../hooks/useContent";
import { formatDate } from "../../utils/formatting";
import { useParams } from "react-router-dom";

const StyledMenu = styled.div.attrs({
  className: "py-8 px-6 rounded-lg space-y-4",
})``;

const StyledMenuWrapper = styled.div.attrs({
  className:
    "w-96 shadow-lg right-0 mt-2 border border-gray-300 rounded-lg bg-white absolute",
})``;

const EditTextArea = css`
  border: 1px solid #bdbdbd;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  padding: 1em;
`;

const NormalTextArea = css`
  font-family: ${({ theme }) => theme.font.family.secondary};
`;

const Menu = ({ toggle }: { toggle: () => void }) => {
  const { id } = useParams();
  if (!id) return null;
  const ctx = useQuery<Data, Var>(MASTER, {
    fetchPolicy: "cache-only",
    variables: { id },
  });

  const owner = ctx.data?.board.members.find(
    (member) => member.role === "OWNER"
  );
  const date = formatDate(ctx.data?.board.createdAt);

  return (
    <StyledMenuWrapper>
      <StyledMenu>
        <Flex style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text fontWeight="600">{ctx.data?.board.title}</Text>
          <Icon.Close
            className="material-icons !text-xl cursor-pointer text-red font-bold"
            onClick={toggle}
          />
        </Flex>
        <hr className="w-full h-px bg-gray-300" />
        <Flow>
          <MadeBy owner={owner as Gql.Member} date={date} />
          <Description
            value={ctx.data?.board.description || "No description yet"}
          />
          <Team />
        </Flow>
      </StyledMenu>
    </StyledMenuWrapper>
  );
};

const MadeBy = ({ owner, date }: { owner: Gql.Member; date: string }) => {
  const theme = useTheme();

  return (
    <>
      {/* Introduction */}
      <InfoLabel text="Made by">
        <Icon.AccountCircle />
      </InfoLabel>
      {/* Owner Info */}
      <Flex style={{ alignItems: "center" }}>
        <Avatar username={owner?.user.username} id={owner?.user.avatar} />
        <Flow space="0.125em">
          <Text fontFamily={theme.font.family.secondary} fontWeight="600">
            {owner?.user.username}
          </Text>
          <Text
            color="GRAY4"
            fontSize={theme.font.size[200]}
            lineHeight={theme.lineHeight[0]}
          >{`on ${date}`}</Text>
        </Flow>
      </Flex>
    </>
  );
};

const Description = ({ value }: { value: string }) => {
  const { id } = useParams();
  if (!id) return null;
  const theme = useTheme();
  const contentController = useContent(value);
  const textAreaController = useTextArea(value);
  const [edit, setEdit] = useVisibility();

  const [changeDescription] = useMutation<{
    createBoard: Gql.Board;
  }>(CHANGE_DESCRIPTION, {
    refetchQueries: [{ query: MASTER, variables: { id } }],
  });

  const onCancel = () => {
    textAreaController.setValue(contentController.onCancel());
    setEdit();
  };

  const onSave = () => {
    console.log({ text: textAreaController.value, id });

    changeDescription({
      variables: {
        data: {
          description: textAreaController.value,
          id,
        },
      },
    });

    setEdit();
  };

  return (
    <Flow>
      <Flex>
        <InfoLabel text="Description">
          <Icon.Description />
        </InfoLabel>
        {!edit && (
          <Button.Outline
            color="GRAY3"
            style={{ padding: "0.25em 1em" }}
            onClick={setEdit}
          >
            <Icon.Edit style={{ fontSize: theme.font.size[200] }} />
            <Text fontSize={theme.font.size[200]}>Edit</Text>
          </Button.Outline>
        )}
      </Flex>
      <Flow>
        <TextArea
          {...textAreaController}
          disabled={!edit}
          specialStyle={edit ? EditTextArea : NormalTextArea}
        />
        {edit && (
          <Flex style={{ alignItems: "center" }}>
            <Button.Colored
              backgroundColor="GREEN1"
              style={{ padding: "0.4em 1em" }}
              onClick={onSave}
            >
              <Text
                fontFamily={theme.font.family.secondary}
                fontSize={theme.font.size[200]}
              >
                Save
              </Text>
            </Button.Colored>
            <Text style={{ cursor: "pointer" }} onClick={onCancel}>
              Cancel
            </Text>
          </Flex>
        )}
      </Flow>
    </Flow>
  );
};

const Team = () => {
  const { id: boardId } = useParams();
  if (!boardId) return null;
  const theme = useTheme();
  const ctx = useQuery<Data, Var>(MASTER, {
    fetchPolicy: "cache-only",
    variables: { id: boardId },
  });
  const [deleteUser] = useMutation<{ deleteUser: Gql.Board }, DeleteUserInput>(
    DELETE_USER,
    {
      refetchQueries: [
        {
          query: MASTER,
          variables: { id: boardId },
        },
        {
          query: FRIENDS_NOT_IN_BOARD,
          variables: { id: boardId },
        },
      ],
    }
  );

  const user = ctx.data?.board.members.find(
    (member) => member.user.id === ctx.data?.authorizedUser.id
  );
  const isAdmin = user ? user.role !== "MEMBER" : false;
  const deleteUserHandler = (id: string) =>
    deleteUser({
      variables: { data: { boardId, userId: id } },
    });

  return (
    <Flow>
      <InfoLabel text="Team">
        <Icon.Description />
      </InfoLabel>
      <div>
        {ctx.data?.board.members.map((member) => (
          <div
            key={member.user.id}
            className="flex items-center justify-between"
          >
            <User user={member.user} />
            {member.role === "MEMBER" && isAdmin ? (
              <Button.Outline
                color="RED"
                style={{ padding: "0.33em 0.75em" }}
                onClick={() => deleteUserHandler(member.user.id)}
              >
                <Text fontSize={theme.font.size[200]}>Remove</Text>
              </Button.Outline>
            ) : (
              <Text fontSize={theme.font.size[200]} color="GRAY4">
                {member.role}
              </Text>
            )}
          </div>
        ))}
      </div>
    </Flow>
  );
};

export default Menu;

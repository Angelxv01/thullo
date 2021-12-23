import { useMutation } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import {
  ChangeListNameInput,
  CHANGE_LIST_NAME,
  DeleteListInput,
  DELETE_LIST,
} from "../../graphql/mutation";
import { MASTER } from "../../graphql/query";
import useVisibility from "../../hooks/useVisiblity";
import { Absolute, Button, InputGroup, Relative, Text, Icon } from "../common";
import StyledListOperation from "./StyledListOperation";
import * as Gql from "../../gqlTypes";
import useInput from "../../hooks/useInput";

const ListOperation = ({ list }: { list: Gql.List }) => {
  const [rename, setRename] = useVisibility();
  const controller = useInput("text");
  const [changeListName] = useMutation<
    { changeListName: Gql.List },
    ChangeListNameInput
  >(CHANGE_LIST_NAME, {
    refetchQueries: [
      { query: MASTER, variables: { id: "6182d8c9bba2b2dfab68119d" } },
    ],
  });
  const [deleteList] = useMutation<{ deleteList: boolean }, DeleteListInput>(
    DELETE_LIST,
    {
      refetchQueries: [
        { query: MASTER, variables: { id: "6182d8c9bba2b2dfab68119d" } },
      ],
    }
  );

  const handleChangeListName = async () => {
    await changeListName({
      variables: {
        data: {
          name: controller.value,
          listId: list.id,
        },
      },
    });
    setRename();
  };

  const handleDeleteList = async () =>
    deleteList({ variables: { data: { id: list.id } } });

  return (
    <StyledListOperation space="0.25em">
      <Relative>
        <GrayText onClick={setRename}>Rename</GrayText>
        {rename && (
          <Absolute style={{ marginTop: "1em" }}>
            <InputGroup
              width="100%"
              props={{ ...controller, style: { fontSize: "1.25em" } }}
            >
              <Button.Squared onClick={handleChangeListName}>
                <Icon.Edit />
              </Button.Squared>
            </InputGroup>
          </Absolute>
        )}
      </Relative>
      <StyledSeparator />
      <GrayText onClick={handleDeleteList}>Delete this list</GrayText>
    </StyledListOperation>
  );
};

const GrayText = styled(Text)`
  color: hsl(${({ theme }) => theme.color.GRAY3});
  font-size: ${({ theme }) => theme.font.size[200]};
  line-height: ${({ theme }) => theme.lineHeight[0]};
  cursor: pointer;
`;

const StyledSeparator = styled.hr`
  border: 0;
  width: 100%;
  height: ${({ theme }) => theme.font.size[1]};
  background-color: hsl(${({ theme }) => theme.color.GRAY5});
`;

export default ListOperation;

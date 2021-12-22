import { useMutation, useQuery } from "@apollo/client";
import React, { DragEvent } from "react";
import { MASTER } from "../../graphql/query";
import * as Gql from "../../gqlTypes";
import List from "../List";
import StyledKanban from "./StyledKanban";
import { Absolute, Button, Icon, InputGroup, Relative } from "../common";
import { CHANGE_LIST } from "../../graphql/mutation";
import useVisibility from "../../hooks/useVisiblity";

const Kanban = () => {
  const ctx = useQuery(MASTER, {
    fetchPolicy: "cache-and-network",
    variables: { id: "6182d8c9bba2b2dfab68119d" },
  });
  const [changeList] = useMutation<
    { changeList: Gql.Card },
    { data: { cardId: string; listId: string } }
  >(CHANGE_LIST, {
    refetchQueries: [
      {
        query: MASTER,
        variables: { id: "6182d8c9bba2b2dfab68119d" },
      },
    ],
  });

  const [visible, setVisible] = useVisibility();

  const onDragStart = (e: DragEvent<HTMLDivElement>, card: string) => {
    e.dataTransfer.setData("card", card);
  };
  const onDrop = async (e: DragEvent<HTMLDivElement>, list: string) => {
    const card = e.dataTransfer.getData("card");
    await changeList({ variables: { data: { cardId: card, listId: list } } });
  };

  return (
    <StyledKanban>
      {ctx.data.board.lists.map((list: Gql.List) => (
        <List
          key={list.id}
          {...list}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />
      ))}
      <Relative style={{ minWidth: "20em" }}>
        <Button.IconColored onClick={setVisible}>
          {visible ? (
            <>
              Close
              <Icon.Close />
            </>
          ) : (
            <>
              Add another List
              <Icon.Add />
            </>
          )}
        </Button.IconColored>
        {visible && <NewList />}
      </Relative>
    </StyledKanban>
  );
};

const NewList = () => {
  return (
    <Absolute style={{ width: "100%", marginTop: "1em" }}>
      <InputGroup width="100%">
        <Button.Squared>
          <Icon.Add />
        </Button.Squared>
      </InputGroup>
    </Absolute>
  );
};

export default Kanban;

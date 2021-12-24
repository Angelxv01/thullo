import { useMutation, useQuery } from "@apollo/client";
import React, { DragEvent } from "react";
import { MASTER } from "../../graphql/query";
import * as Gql from "../../gqlTypes";
import List from "../List";
import StyledKanban from "./StyledKanban";
import { Button, Icon, Relative } from "../common";
import { CHANGE_LIST } from "../../graphql/mutation";
import useVisibility from "../../hooks/useVisiblity";
import NewList from "./NewList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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
  const onDrop = async (result: DropResult) => {
    const { draggableId: cardId, destination } = result;
    const listId = destination?.droppableId || "";
    await changeList({ variables: { data: { cardId, listId } } });
  };

  return (
    <DragDropContext onDragEnd={onDrop}>
      <StyledKanban>
        {ctx.data.board.lists.map((list: Gql.List) => (
          <List key={list.id} list={list} />
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
          {visible && <NewList setVisible={setVisible} />}
        </Relative>
      </StyledKanban>
    </DragDropContext>
  );
};

export default Kanban;

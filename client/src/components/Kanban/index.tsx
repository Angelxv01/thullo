import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { MASTER, Var } from "../../graphql/query";
import * as Gql from "../../gqlTypes";
import List from "../List";
import StyledKanban from "./StyledKanban";
import { Button, Icon, Relative } from "../common";
import { CHANGE_LIST } from "../../graphql/mutation";
import useVisibility from "../../hooks/useVisiblity";
import NewList from "./NewList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

const Kanban = () => {
  const { id } = useParams();
  if (!id) return null;
  const { data: ctx } = useQuery<{ board: Gql.Board }, Var>(MASTER, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });

  const [changeList] = useMutation<
    { changeList: Gql.Card },
    { data: { cardId: string; listId: string } }
  >(CHANGE_LIST, {
    refetchQueries: [{ query: MASTER, variables: { id } }],
  });

  const [visible, setVisible] = useVisibility();

  const onDrop = (result: DropResult) => {
    const { draggableId: cardId, destination } = result;
    const listId = destination?.droppableId;
    if (!listId) return;
    changeList({ variables: { data: { cardId, listId } } });
  };

  return (
    <DragDropContext onDragEnd={onDrop}>
      <StyledKanban>
        {ctx?.board.lists.map((list: Gql.List) => (
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

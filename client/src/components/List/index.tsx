import React from "react";
import { Droppable } from "react-beautiful-dnd";
import * as Gql from "../../gqlTypes";
import useVisibility from "../../hooks/useVisiblity";
import Card from "../Card";
import { Button, Flow, Icon } from "../common";
import Header from "./Header";
import NewCard from "./NewCard";
import StyledList from "./StyledList";

const List = ({ list }: { list: Gql.List }) => {
  const [newCard, setNewCard] = useVisibility();

  return (
    <StyledList>
      <Flow>
        <Header list={list} />
        <Droppable droppableId={list.id}>
          {(provided) => (
            <Flow ref={provided.innerRef} {...provided.droppableProps}>
              {list.cards.map((card, index) => (
                <Card key={card.id} card={card} index={index} />
              ))}
              {provided.placeholder}
            </Flow>
          )}
        </Droppable>

        {newCard && <NewCard listId={list.id} setVisibility={setNewCard} />}
        <Button.IconColored onClick={setNewCard}>
          {newCard ? (
            <>
              Close
              <Icon.Close />
            </>
          ) : (
            <>
              Add another card
              <Icon.Add />
            </>
          )}
        </Button.IconColored>
      </Flow>
    </StyledList>
  );
};

export default List;

import React, { DragEvent } from "react";
import * as Gql from "../../gqlTypes";
import useVisibility from "../../hooks/useVisiblity";
import Card from "../Card";
import { Button, Flow, Icon } from "../common";
import Header from "./Header";
import NewCard from "./NewCard";
import StyledList from "./StyledList";

const List = ({
  list,
  onDragStart,
  onDrop,
}: {
  list: Gql.List;
  onDragStart: (e: DragEvent<HTMLDivElement>, list: string) => void;
  onDrop: (e: DragEvent<HTMLDivElement>, list: string) => void;
}) => {
  const [newCard, setNewCard] = useVisibility();

  return (
    <StyledList
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, list.id)}
    >
      <Flow>
        <Header list={list} />
        {list.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDragStart={(e) => onDragStart(e, card.id)}
          />
        ))}
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

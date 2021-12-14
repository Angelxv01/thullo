import React, {DragEvent, useState} from 'react';
import * as GqlTypes from '../../../types/gqlTypes';
import Card from '../Card';
import {Button, Flow, Icon} from '../common';
import Header from './Header';
import NewCard from './NewCard';
import StyledList from './StyledList';

const List = ({
  id,
  name,
  cards,
  onDragStart,
  onDrop,
}: {
  id: string;
  name: string;
  cards: GqlTypes.Card[];
  onDragStart: (e: DragEvent<HTMLDivElement>, list: string) => void;
  onDrop: (e: DragEvent<HTMLDivElement>, list: string) => void;
}) => {
  const [newCard, setNewCard] = useState<boolean>(false);

  return (
    <StyledList
      onDragOver={e => e.preventDefault()}
      onDrop={e => onDrop(e, id)}
    >
      <Flow>
        <Header name={name} />
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onDragStart={e => onDragStart(e, card.id)}
          />
        ))}
        {newCard && <NewCard />}
        <Button.IconColored onClick={() => setNewCard(state => !state)}>
          Add another card
          <Icon.Add />
        </Button.IconColored>
      </Flow>
    </StyledList>
  );
};

export default List;

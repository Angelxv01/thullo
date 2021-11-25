import React, {useState} from 'react';
import * as GqlTypes from '../../../server/graphql/type';
import Card from '../Card';
import {Button, Flow, Icon} from '../common';
import Header from './Header';
import NewCard from './NewCard';
import StyledList from './StyledList';

const List = ({
  name,
  cards,
}: {
  id: string;
  name: string;
  cards: GqlTypes.Card[];
}) => {
  const [newCard, setNewCard] = useState<boolean>(false);

  return (
    <StyledList>
      <Flow>
        <Header name={name} />
        {cards.map(card => (
          <Card key={card.id} card={card} />
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

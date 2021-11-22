import React from 'react';
import * as GqlTypes from '../../../server/graphql/type';
import Card from '../Card';
import {Button, Flow, Icon} from '../common';
import Header from './Header';
import StyledList from './StyledList';

const List = ({
  name,
  cards,
}: {
  id: string;
  name: string;
  cards: GqlTypes.Card[];
}) => {
  return (
    <StyledList>
      <Flow>
        <Header name={name} />
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
        <Button.IconColored>
          Add another card
          <Icon.Add />
        </Button.IconColored>
      </Flow>
    </StyledList>
  );
};

export default List;

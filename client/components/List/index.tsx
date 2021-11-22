import React from 'react';
import * as GqlTypes from '../../../server/graphql/type';
import Card from '../Card';
import {Flow} from '../common';
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
      <Header name={name} />
      <Flow>
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </Flow>
    </StyledList>
  );
};

export default List;

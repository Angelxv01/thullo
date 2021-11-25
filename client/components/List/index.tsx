import React, {useState} from 'react';
import {useTheme} from 'styled-components';
import * as GqlTypes from '../../../server/graphql/type';
import useTextArea from '../../hooks/useTextArea';
import Card from '../Card';
import {Button, Flow, Icon, TextArea, Text} from '../common';
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

const NewCard = () => {
  const theme = useTheme();
  const controller = useTextArea();
  return (
    <Flow
      style={{
        backgroundColor: `hsl(${theme.color.WHITE})`,
        border: `1px solid hsl(${theme.color.GRAY5})`,
        borderRadius: theme.border.radius[2],
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '1em',
        maxWidth: '100%',
      }}
    >
      <TextArea {...controller} placeholder="Enter a title for this card..." />
      <Button.Colored backgroundColor="GREEN1" style={{padding: '0.4em 1em'}}>
        <Text
          fontFamily={theme.font.family.secondary}
          fontSize={theme.font.size[200]}
        >
          Save
        </Text>
      </Button.Colored>
    </Flow>
  );
};

export default List;

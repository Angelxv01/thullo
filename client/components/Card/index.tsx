import React from 'react';
import * as GqlTypes from '../../../server/graphql/type';
import Avatars from '../Avatars';
import {Button, Flex, Icon, Label} from '../common';
import {Cover, Labels, StatusBar, Title} from './Utils';
import StyledCard from './StyledCard';
import InfoLabel from '../common/InfoLabel';

const Card = ({card}: {card: GqlTypes.Card}) => {
  return (
    <StyledCard>
      {card.coverId && (
        <Cover src={`https://source.unsplash.com/${card.coverId}`} />
      )}
      <Title>{card.title}</Title>
      <Labels>
        {card.labels.map(label => (
          <Label color={label.color} key={label.id}>
            {label.text}
          </Label>
        ))}
      </Labels>

      <StatusBar>
        {/* Avatars */}
        <Avatars members={card.members}>
          <Button.Squared>
            <Icon.Add />
          </Button.Squared>
        </Avatars>
        {/* InfoLabel */}
        <Flex space="0.5rem">
          {card.comments.length > 0 && (
            <InfoLabel text={card.comments.length}>
              <Icon.Comment />
            </InfoLabel>
          )}
          {card.attachments.length > 0 && (
            <InfoLabel text={card.attachments.length}>
              <Icon.AttachFile />
            </InfoLabel>
          )}
        </Flex>
      </StatusBar>
    </StyledCard>
  );
};

export default Card;

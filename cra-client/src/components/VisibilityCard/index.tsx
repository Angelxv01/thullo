import React from 'react';
import {useTheme} from 'styled-components';
import Card from './Card';
import {Flow, Icon, Text} from '../common';

const VisibilityCard = () => {
  const theme = useTheme();
  return (
    <Flow space="0.5em">
      <Flow space="1px">
        <Text color="GRAY2" fontWeight="600">
          Visibility
        </Text>
        <Text
          color="GRAY3"
          fontSize={theme.font.size[200]}
          lineHeight={theme.lineHeight[0]}
        >
          Choose who can see to this board.
        </Text>
      </Flow>

      <Card description="Anyone on the internet can see this. ">
        <Icon.Public />
        <Text fontWeight="bold">Public</Text>
      </Card>
      <Card description="Only board members can see this">
        <Icon.Lock />
        <Text fontWeight="bold">Private</Text>
      </Card>
    </Flow>
  );
};

export default VisibilityCard;

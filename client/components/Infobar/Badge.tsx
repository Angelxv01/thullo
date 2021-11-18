import React from 'react';
import {Button, Icon, Text} from '../common';

const VisibilityBadge = ({visibility}: {visibility: string}) =>
  visibility === 'PRIVATE' ? <Private /> : <Public />;

const Private = () => (
  <Button.Icon>
    <Icon.Lock />
    <Text>Private</Text>
  </Button.Icon>
);

const Public = () => (
  <Button.Icon>
    <Icon.Public />
    <Text>Public</Text>
  </Button.Icon>
);

export default VisibilityBadge;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Avatar, Button} from './components/common';
import Navigation from './components/Navigation';
import {Icon, Text, Flex, Container} from './components/common';
import {useQuery} from '@apollo/client';
import {MASTER} from './query';
import {IUser, Role} from '../types';

const App = () => {
  const ctx = useQuery(MASTER, {variables: {id: '6182d8c9bba2b2dfab68119d'}});

  if (!ctx.data) return null;

  return (
    <Container>
      <Navigation />
      {/* Infobar */}
      <Flex style={{justifyContent: 'space-between', padding: '1.5rem 2rem'}}>
        <Flex>
          <VisibilityButton visibility={ctx.data.board.visibility} />
          <Flex space="0.5rem">
            {ctx.data.board.members.map(
              (member: {_role: Role; user: IUser}) => (
                <Avatar
                  key={member.user.username}
                  username={member.user.username}
                  id={member.user.avatar}
                />
              )
            )}
            <Button.Squared>
              <Icon.Add />
            </Button.Squared>
          </Flex>
        </Flex>
        <Button.Icon>
          <Icon.MoreHoriz />
          <Text>Show Menu</Text>
        </Button.Icon>
      </Flex>
    </Container>
  );
};

const VisibilityButton = ({visibility}: {visibility: string}) =>
  visibility === 'PRIVATE' ? <PrivateButton /> : <PublicButton />;

const PrivateButton = () => (
  <Button.Icon>
    <Icon.Lock />
    <Text>Private</Text>
  </Button.Icon>
);

const PublicButton = () => (
  <Button.Icon>
    <Icon.Public />
    <Text>Public</Text>
  </Button.Icon>
);

export default App;

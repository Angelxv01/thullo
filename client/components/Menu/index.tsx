/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {useQuery} from '@apollo/client';
import React from 'react';
import styled, {useTheme} from 'styled-components';
import {Data, Var, MASTER} from '../../query';
import {
  Button,
  Flex,
  Icon,
  Absolute,
  Text,
  Flow,
  Avatar,
  TextArea,
} from '../common';
import InfoLabel from '../common/InfoLabel';
import * as GQLTypes from '../../../server/graphql/type';
import useTextArea from '../../hooks/useTextArea';
import User from '../User';

const StyledMenu = styled(Flow)`
  justify-content: space-between;
  align-items: center;
  background-color: hsl(${({theme}) => theme.color.WHITE});
  height: fit-content;
  padding: 2em 1.5em;
`;

const StyledMenuWrapper = styled(Absolute)`
  width: 33%;
  top: 0;
  right: 0;
  padding: 0 2em;
  z-index: ${({theme}) => theme.z.MENU};
`;

const StyledSeparator = styled.hr`
  border: 0;
  height: ${({theme}) => theme.font.size[1]};
  background-color: hsl(${({theme}) => theme.color.GRAY5});
`;

const Menu = ({toggle}: {toggle: () => void}) => {
  const ctx = useQuery<Data, Var>(MASTER, {
    fetchPolicy: 'cache-only',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });

  if (!ctx.data) {
    return null;
  }

  const owner = ctx.data.board.members.find(member => member.role === 'OWNER');
  const date = new Date(ctx.data.board.createdAt).toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <StyledMenuWrapper>
      <StyledMenu>
        <Flex style={{justifyContent: 'space-between', alignItems: 'center'}}>
          <Text fontWeight="600">{ctx.data.board.title}</Text>
          <Button.Squared onClick={toggle}>
            <Icon.Close />
          </Button.Squared>
        </Flex>
        <StyledSeparator />
        <Flow>
          <MadeBy owner={owner as GQLTypes.Member} date={date} />
          <Description value={ctx.data.board.description || ''} />
          <Team />
        </Flow>
      </StyledMenu>
    </StyledMenuWrapper>
  );
};

const MadeBy = ({owner, date}: {owner: GQLTypes.Member; date: string}) => {
  const theme = useTheme();

  return (
    <>
      {/* Introduction */}
      <InfoLabel text="Made by">
        <Icon.AccountCircle />
      </InfoLabel>
      {/* Owner Info */}
      <Flex style={{alignItems: 'center'}}>
        <Avatar username={owner.user.username} id={owner?.user.avatar} />
        <Flow space="0.125em">
          <Text fontFamily={theme.font.family.secondary} fontWeight="600">
            {owner.user.username}
          </Text>
          <Text
            color="GRAY4"
            fontSize={theme.font.size[200]}
            lineHeight={theme.lineHeight[0]}
          >{`on ${date}`}</Text>
        </Flow>
      </Flex>
    </>
  );
};

const Description = ({value}: {value: string}) => {
  const controller = useTextArea(value);
  return (
    <Flow>
      <Flex>
        <InfoLabel text="Description">
          <Icon.Description />
        </InfoLabel>
        <Button.IconColored>
          <Icon.Edit />
          <Text>Edit</Text>
        </Button.IconColored>
      </Flex>
      <TextArea {...controller} />
    </Flow>
  );
};

const Team = () => {
  const theme = useTheme();
  const ctx = useQuery<Data, Var>(MASTER, {
    fetchPolicy: 'cache-only',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });
  if (!ctx.data) return null;

  const user = ctx.data.board.members.find(
    member => member.user.id === ctx.data?.authorizedUser.id
  );
  const isAdmin = user ? user.role !== 'MEMBER' : false;

  return (
    <Flow>
      <InfoLabel text="Team">
        <Icon.Description />
      </InfoLabel>
      {ctx.data.board.members.map(member => (
        <Flex
          key={member.user.id}
          style={{justifyContent: 'space-between', alignItems: 'center'}}
        >
          <User user={member.user} />
          {member.role === 'MEMBER' && isAdmin ? (
            <Button.Outline color="RED" style={{padding: '0.33em 0.75em'}}>
              <Text fontSize={theme.font.size[200]}>Remove</Text>
            </Button.Outline>
          ) : (
            <Text fontSize={theme.font.size[200]} color="GRAY4">
              {member.role}
            </Text>
          )}
        </Flex>
      ))}
    </Flow>
  );
};

export default Menu;

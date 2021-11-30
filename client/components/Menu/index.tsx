/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {useQuery} from '@apollo/client';
import React from 'react';
import styled from 'styled-components';
import {MASTER} from '../../query';
import {Button, Flex, Icon, Absolute, Text, Flow} from '../common';
import InfoLabel from '../common/InfoLabel';

const StyledMenu = styled(Flow)`
  justify-content: space-between;
  align-items: center;
  z-index: ${({theme}) => theme.z.MENU};
  background-color: hsl(${({theme}) => theme.color.WHITE});
  min-width: 20em;
  min-height: 10em;
  padding: 2em 1.5em;
`;

const StyledMenuWrapper = styled(Absolute)`
  top: 0;
  right: 0;
  padding: 0 2em;
`;

const StyledSeparator = styled.hr`
  border: 0;
  height: ${({theme}) => theme.font.size[1]};
  background-color: hsl(${({theme}) => theme.color.GRAY5});
`;

const Menu = ({toggle}: {toggle: () => void}) => {
  const ctx = useQuery(MASTER, {
    fetchPolicy: 'cache-only',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });

  return (
    <StyledMenuWrapper>
      <StyledMenu>
        <Flex>
          <Text fontWeight="600">{ctx.data.board.title}</Text>
          <Button.Squared onClick={toggle}>
            <Icon.Close />
          </Button.Squared>
        </Flex>
        <StyledSeparator />
        <Flow>
          <InfoLabel text="Made by">
            <Icon.AccountCircle />
          </InfoLabel>
        </Flow>
      </StyledMenu>
    </StyledMenuWrapper>
  );
};

export default Menu;

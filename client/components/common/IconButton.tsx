import React from 'react';
import styled from 'styled-components';
import {Flex} from '../../style/Utils';

const StyledIconButton = styled.button`
  border-radius: ${({theme}) => theme.border.radius[1]};
  border: 0;
  cursor: pointer;
  color: hsl(${({theme}) => theme.color.GRAY3});

  & > * {
    padding: 0.5em 1em;
  }

  &,
  & .material-icons {
    font-size: ${({theme}) => theme.font.size['300']};
  }
`;

const IconButton = ({children}: {children: React.ReactChild[]}) => (
  <StyledIconButton>
    <Flex as="span" space="0.5rem">
      {children}
    </Flex>
  </StyledIconButton>
);

export default IconButton;

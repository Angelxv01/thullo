import React from 'react';
import styled from 'styled-components';
import {Flex} from '../../style/Utils';

interface Color {
  color?: string;
}

export const Colored = styled.button<Color>`
  cursor: pointer;
  border-radius: ${({theme}) => theme.border.radius[1]};
  background-color: hsl(
    ${({color, theme}) => (color && theme.color[color]) || theme.color.BLUE1}
  );
  color: hsl(${({theme}) => theme.color.WHITE});
  border: ${({theme}) => theme.font.size[1]} solid
    hsl(
      ${({color, theme}) => (color && theme.color[color]) || theme.color.BLUE1}
    );
  padding: 0.75em 2em;
  line-height: ${({theme}) => theme.lineHeight[0]};

  /* &:hover {
    background-color: hsl(${({theme}) => theme.color.WHITE});
    color: hsl(
      ${({color, theme}) => (color && theme.color[color]) || theme.color.BLUE1}
    );
  } */
`;

const StyledIcon = styled.button`
  cursor: pointer;
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
    line-height: ${({theme}) => theme.lineHeight[0]};
  }
`;

export const Icon = ({
  children,
}: {
  children: React.ReactChild[] | React.ReactChild;
}) => (
  <StyledIcon>
    <Flex as="span" space="0.5rem">
      {children}
    </Flex>
  </StyledIcon>
);
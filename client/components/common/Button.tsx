import React from 'react';
import styled from 'styled-components';
import {Flex} from '../../style/Utils';

interface Color {
  color?: string;
  backgroundColor?: string;
}

export const Colored = styled.button<Color>`
  cursor: pointer;
  border-radius: ${({theme}) => theme.border.radius[1]};
  background-color: hsl(
    ${({backgroundColor, theme}) =>
      backgroundColor && theme.color[backgroundColor]
        ? theme.color[backgroundColor]
        : theme.color.BLUE1}
  );
  color: hsl(${({theme}) => theme.color.WHITE});
  border: 0;
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

export const Squared = styled.button<Color>`
  // flex: 1;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  border-radius: ${({theme}) => theme.border.radius[1]};
  outline: none;
  width: 2rem;
  aspect-ratio: 1;
  border: 0;
  color: hsl(
    ${({theme, color}) =>
      color && theme.color[color] ? theme.color[color] : theme.color.WHITE}
  );
  background-color: hsl(
    ${({theme, color}) =>
      color && theme.color[color] ? theme.color[color] : theme.color.BLUE1}
  );
`;

export const IconColored = styled.button<Color>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex: 0;
  align-items: center;
  cursor: pointer;
  border: 0;
  padding: 0.5em 1em;
  background-color: hsl(
    ${({color, theme}) =>
        color && theme.color[color] ? theme.color[color] : theme.color.BLUE1} /
      0.2
  );
  border-radius: ${({theme}) => theme.border.radius[1]};
  &,
  & > * {
    color: hsl(
      ${({theme, color}) =>
        color && theme.color[color] ? theme.color[color] : theme.color.BLUE1}
    );
  }
`;

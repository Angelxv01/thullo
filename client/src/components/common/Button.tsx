import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { Flex } from "../../style/Utils";

interface Color {
  color?: string;
  backgroundColor?: string;
}

export const Colored = styled.button<Color>`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  background-color: hsl(
    ${({ backgroundColor, theme }) =>
      backgroundColor && theme.color[backgroundColor]
        ? theme.color[backgroundColor]
        : theme.color.BLUE1}
  );
  color: hsl(${({ theme }) => theme.color.WHITE});
  border: 0;
  line-height: ${({ theme }) => theme.lineHeight[0]};

  /* &:hover {
    background-color: hsl(${({ theme }) => theme.color.WHITE});
    color: hsl(
      ${({ color, theme }) =>
    (color && theme.color[color]) || theme.color.BLUE1}
    );
  } */
`;

export const Outline = styled(Colored)`
  font-size: 10px;
  gap: 0.25em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  color: hsl(${({ theme }) => theme.color.WHITE});
  line-height: ${({ theme }) => theme.lineHeight[0]};

  background-color: hsl(${({ theme }) => theme.color.WHITE});
  color: hsl(
    ${({ color, theme }) => (color && theme.color[color]) || theme.color.BLUE1}
  );
  border: hsl(
      ${({ color, theme }) =>
        (color && theme.color[color]) || theme.color.BLUE1}
    )
    1px solid;
`;

const StyledIcon = styled.button`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  border: 0;
  cursor: pointer;
  color: hsl(${({ theme }) => theme.color.GRAY3});

  & > * {
    padding: 0.5em 1em;
  }

  &,
  & .material-icons {
    font-size: ${({ theme }) => theme.font.size["300"]};
    line-height: ${({ theme }) => theme.lineHeight[0]};
  }
`;

export const Icon = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { children, ...button } = props;

  return (
    <StyledIcon {...button}>
      <Flex as="span" space="0.5rem">
        {children}
      </Flex>
    </StyledIcon>
  );
};

export const Squared = styled.button<Color>`
  // flex: 1;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  outline: none;
  width: 2rem;
  aspect-ratio: 1;
  border: 0;
  color: hsl(
    ${({ theme, color }) =>
      color && theme.color[color] ? theme.color[color] : theme.color.WHITE}
  );
  background-color: hsl(
    ${({ theme, color }) =>
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
  border-radius: ${({ theme }) => theme.border.radius[1]};
  background-color: hsl(
    ${({ theme, backgroundColor }) =>
      backgroundColor && theme.color[backgroundColor]
        ? theme.color[backgroundColor] + "/ 0.2"
        : theme.color.BLUE1 + "/ 0.2"}
  );

  &,
  & > * {
    color: hsl(
      ${({ theme, color }) =>
        color && theme.color[color] ? theme.color[color] : theme.color.BLUE1}
    );
  }
`;

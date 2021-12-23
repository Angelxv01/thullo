import React, { TextareaHTMLAttributes } from "react";
import styled, {
  DefaultTheme,
  FlattenInterpolation,
  ThemeProps,
} from "styled-components";
import { IUseTextArea } from "../../hooks/useTextArea";

// https://codepen.io/chriscoyier/pen/XWKEVLy
// unfortunately this approach woudn't work
// if the word is really long

interface StyleManipulation {
  copy?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const StyledTextArea = styled.div<StyleManipulation>`
  display: grid;

  &::after {
    content: attr(data-replicated-value) " ";
    white-space: pre-wrap;
    visibility: hidden;
  }

  & > textarea {
    resize: none;
    overflow: hidden;
  }

  & > textarea,
  &::after {
    grid-area: 1 / 1 / 2 / 2;
    border: 0;
    font: inherit;
    letter-spacing: inherit;
    padding: 0;
    outline: 0;
    ${({ copy }) => copy && copy}
  }
`;

const TextArea = (
  props: IUseTextArea &
    TextareaHTMLAttributes<HTMLTextAreaElement> & {
      specialStyle?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
    }
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { divRef, textAreaRef, specialStyle, setValue, ...other } = props;
  return (
    <StyledTextArea ref={divRef} copy={specialStyle}>
      <textarea ref={textAreaRef} {...other} />
    </StyledTextArea>
  );
};

export default TextArea;

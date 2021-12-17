import React, { TextareaHTMLAttributes } from "react";
import styled from "styled-components";
import { IUseTextArea } from "../../hooks/useTextArea";

// https://codepen.io/chriscoyier/pen/XWKEVLy
// unfortunately this approach woudn't work
// if the word is really long
const StyledTextArea = styled.div`
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
    overflow-wrap: break-word;
    border-radius: ${({ theme }) => theme.border.radius[1]};
    border: 0;
    outline: 0;
    font: inherit;
  }
`;

const TextArea = (
  props: IUseTextArea & TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
  const { divRef, textAreaRef, ...other } = props;
  return (
    <StyledTextArea ref={divRef}>
      <textarea ref={textAreaRef} {...other} />
    </StyledTextArea>
  );
};

export default TextArea;

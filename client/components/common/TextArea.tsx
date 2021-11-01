import React, {HtmlHTMLAttributes} from 'react';
import styled from 'styled-components';
import {IUseTextArea} from '../../hooks/UseTextArea';

// https://codepen.io/chriscoyier/pen/XWKEVLy
const StyledTextArea = styled.div`
  display: grid;
  width: 100%;

  &::after {
    content: attr(data-replicated-value) ' ';
    white-space: pre-wrap;
    visibility: hidden;
  }

  & > textarea {
    resize: none;
    overflow: hidden;
  }

  & > textarea,
  &::after {
    padding: 0.5rem;
    grid-area: 1 / 1 / 2 / 2;
    overflow-wrap: break-word;
    max-width: 400px;
    font-family: ${({theme}) => theme.font.family.secondary};
    border-radius: ${({theme}) => theme.border.radius[1]};
    border: 0;
    outline: 0;
    font-weight: 500;
  }
`;

const TextArea = (
  props: IUseTextArea & HtmlHTMLAttributes<HTMLTextAreaElement>
) => {
  return (
    <StyledTextArea ref={props.divRef}>
      <textarea
        {...props}
        ref={props.textAreaRef}
        onChange={props.onChange}
        value={props.value}
      />
    </StyledTextArea>
  );
};

export default TextArea;

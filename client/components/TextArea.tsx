import React from 'react';
import styled from 'styled-components';
import {IUseTextArea} from '../hooks/UseTextArea';

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
    border: 1px solid black;
    padding: 0.5rem;
    grid-area: 1 / 1 / 2 / 2;
    overflow-wrap: break-word;
    max-width: 400px;
  }
`;

const TextArea = (props: IUseTextArea) => {
  return (
    <StyledTextArea ref={props.divRef}>
      <textarea
        ref={props.textAreaRef}
        onChange={props.onChange}
        value={props.value}
      />
    </StyledTextArea>
  );
};

export default TextArea;

import React, {TextareaHTMLAttributes, useRef, useState} from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.div`
  display: grid;

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
  }
`;

// https://codepen.io/chriscoyier/pen/XWKEVLy
const TextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!(divRef.current && textAreaRef.current)) return;
    divRef.current.dataset.replicatedValue = textAreaRef.current.value;
    setValue(e.target.value);
  };

  return (
    <StyledTextArea ref={divRef}>
      <textarea
        ref={textAreaRef}
        onChange={onChange}
        value={value}
        {...props}
      />
    </StyledTextArea>
  );
};

export default TextArea;

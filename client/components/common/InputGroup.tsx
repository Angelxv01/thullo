import React, {HTMLAttributes} from 'react';
import styled from 'styled-components';

interface Size {
  width?: string;
  height?: string;
}

const StyledInput = styled.div<Size>`
  font-size: ${({theme}) => theme.font.size[200]};
  line-height: ${({theme}) => theme.lineHeight[0]};
  padding: 0.125em;
  background-color: hsl(${({theme}) => theme.color.WHITE});
  border-radius: ${({theme}) => theme.border.radius[1]};
  filter: drop-shadow(0px 4px 12px hsl(${({theme}) => theme.color.DARK} / 0.1));
  width: ${({width}) => width || '33.33%'};
  display: flex;

  & > input {
    flex: 1;
    border: 0;
    padding: 0.75em;
    outline: none;
  }
`;

const InputGroup = ({
  children,
  width,
  props,
}: {
  children?: React.ReactChild;
  width: Size['width'];
  props: HTMLAttributes<HTMLInputElement>;
}) => {
  return (
    <StyledInput width={width}>
      <input {...props} />
      {children}
    </StyledInput>
  );
};

export default InputGroup;

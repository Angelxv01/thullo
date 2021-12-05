import React from 'react';
import styled from 'styled-components';
import {Flow, Text} from '../common';

const ListOperation = () => {
  return (
    <Flow space="1em">
      <GrayText>Rename</GrayText>
      <StyledSeparator />
      <GrayText>Delete this list</GrayText>
    </Flow>
  );
};

const GrayText = styled(Text)`
  color: hsl(${({theme}) => theme.color.GRAY3});
  font-size: ${({theme}) => theme.font.size[200]};
  line-height: ${({theme}) => theme.lineHeight[0]};
`;

const StyledSeparator = styled.hr`
  border: 0;
  height: ${({theme}) => theme.font.size[1]};
  background-color: hsl(${({theme}) => theme.color.GRAY5});
`;

export default ListOperation;

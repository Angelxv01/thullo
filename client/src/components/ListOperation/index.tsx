import React from "react";
import styled from "styled-components";
import { Text } from "../common";
import StyledListOperation from "./StyledListOperation";

const ListOperation = () => {
  return (
    <StyledListOperation space="0.25em">
      <GrayText>Rename</GrayText>
      <StyledSeparator />
      <GrayText>Delete this list</GrayText>
    </StyledListOperation>
  );
};

const GrayText = styled(Text)`
  color: hsl(${({ theme }) => theme.color.GRAY3});
  font-size: ${({ theme }) => theme.font.size[200]};
  line-height: ${({ theme }) => theme.lineHeight[0]};
  cursor: pointer;
`;

const StyledSeparator = styled.hr`
  border: 0;
  width: 100%;
  height: ${({ theme }) => theme.font.size[1]};
  background-color: hsl(${({ theme }) => theme.color.GRAY5});
`;

export default ListOperation;

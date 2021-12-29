import styled from "styled-components";

const StyledHr = styled.hr`
  width: ${({ theme }) => theme.font.size[1]};
  height: 2.5em;
  border: ${({ theme }) => theme.font.size[1]} solid
    hsl(${({ theme }) => theme.color.GRAY5});
  background-color: hsl(${({ theme }) => theme.color.GRAY5});
`;

export default StyledHr;

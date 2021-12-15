import styled from "styled-components";
import { Flow } from "../common";

export default styled(Flow)`
  padding: 1em;
  font-family: ${({ theme }) => theme.font.family.secondary};
  border-radius: ${({ theme }) => theme.border.radius[1]};

  &:hover {
    background-color: hsl(${({ theme }) => theme.color.DARK} / 0.05);
    cursor: pointer;
  }
`;

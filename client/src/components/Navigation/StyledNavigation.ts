import styled from "styled-components";

export default styled.nav`
  display: grid;
  padding: 1em 2em;
  grid-template-columns: min-content max-content auto max-content;
  gap: 3em;
  box-shadow: 0px 2px 2px hsl(${({ theme }) => theme.color.DARK} / 0.05);
  &,
  & > * {
    align-items: center;
  }

  & .navigation-info {
    margin-left: 5em;
  }
`;

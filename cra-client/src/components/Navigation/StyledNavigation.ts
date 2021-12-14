import styled from 'styled-components';

export default styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em 2em;
  box-shadow: 0px 2px 2px hsl(${({ theme }) => theme.color.DARK} / 0.05);
`;

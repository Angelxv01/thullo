import styled from 'styled-components';

export default styled.main`
  display: flex;
  gap: 1em;
  margin-inline: 2em;
  padding: 2em;
  overflow-x: scroll;
  background-color: hsl(${({ theme }) => theme.color.WHITE1});
  border-radius: ${({ theme }) => theme.border.radius[3]};
`;

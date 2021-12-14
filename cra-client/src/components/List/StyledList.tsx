import styled from 'styled-components';

export default styled.div`
  flex: 1;
  z-index: ${({ theme }) => theme.z.POPUP};
  min-width: 20em;
`;

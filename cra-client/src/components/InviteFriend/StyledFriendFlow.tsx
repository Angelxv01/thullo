import styled from 'styled-components';
import { Flow } from '../common';

export default styled(Flow)`
  border: 1px solid #e0e0e0;
  padding: 1em;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.1));

  .flex {
    justify-content: space-between;
    align-items: center;
  }
`;

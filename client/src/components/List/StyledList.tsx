import styled from "styled-components";

// for some unknown reason I can set the max and min width
// if I set the actual width, it can't display the right size

export default styled.div`
  z-index: ${({ theme }) => theme.z.POPUP};
  min-width: 20em;
  max-width: 20em;
`;

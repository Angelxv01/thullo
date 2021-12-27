import styled from "styled-components";

export default styled.div`
  z-index: ${({ theme }) => theme.z.POPUP};
  width: clamp(20em, 10vw, 30em);
`;

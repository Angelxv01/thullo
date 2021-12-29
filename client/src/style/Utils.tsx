import styled from "styled-components";

interface Spacing {
  space?: string;
}

export const Flex = styled.div<Spacing>`
  display: flex;
  gap: ${({ space }) => space || "1rem"};
`;
export const Grid = styled.div<Spacing>`
  display: grid;
  gap: ${({ space }) => space || "1rem"};
`;
export const Flow = styled.div<Spacing>`
  & > *:where(:not(:first-child)) {
    margin-top: ${({ space }) => space || "1rem"};
  }
`;
export const Container = styled.div`
  margin: 2em auto;
  width: 80vw;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  background-color: hsl(${({ theme }) => theme.color.WHITE});
`;
export const LoginContainer = styled.div`
  margin: 2em auto;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  background-color: hsl(${({ theme }) => theme.color.WHITE});
`;
export const ReaderOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* added line */
  border: 0;
`;
export const Absolute = styled.div`
  position: absolute;
`;
export const Relative = styled.div`
  position: relative;
`;

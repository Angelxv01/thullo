import styled from 'styled-components';

interface Spacing {
  space?: string;
}

export const Flex = styled.div<Spacing>`
  display: flex;
  gap: ${({space}) => space || '1rem'};
`;
export const Grid = styled.div<Spacing>`
  display: grid;
  gap: ${({space}) => space || '1rem'};
`;
export const Flow = styled.div<Spacing>`
  & > *:where(:not(:first-child)) {
    margin-top: ${({space}) => space || '1rem'};
  }
`;
export const Container = styled.div`
  padding-inline: 2em;
  margin-inline: auto;
  max-width: 80rem;
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

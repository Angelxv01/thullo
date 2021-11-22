import React from 'react';
import styled from 'styled-components';
import {Text} from '.';

const StyledInfoLabel = styled.div`
  display: flex;
  gap: 0.25em;
  align-items: center;
  color: hsl(${({theme}) => theme.color.GRAY4});

  & > * {
    font-size: ${({theme}) => theme.font.size[200]};
  }
`;

const InfoLabel = ({
  text,
  children,
}: {
  text: string | number;
  children: React.ReactChild;
}) => {
  return (
    <StyledInfoLabel>
      {children}
      <Text>{text}</Text>
    </StyledInfoLabel>
  );
};

export default InfoLabel;

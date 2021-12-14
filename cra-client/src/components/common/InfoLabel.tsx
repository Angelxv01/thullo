import React from 'react';
import styled from 'styled-components';
import { Text } from '.';

interface IStyledInfoLabel {
  color?: string;
  fontSize?: string;
  lineHeight?: string;
  fontFamily?: string;
}

export const StyledInfoLabel = styled.div<IStyledInfoLabel>`
  display: flex;
  gap: 0.25em;
  align-items: center;
  color: hsl(
    ${({ theme, color }) =>
      color && theme.color[color] ? theme.color[color] : theme.color.GRAY4}
  );

  & > * {
    line-height: ${({ lineHeight }) => lineHeight || 'inherit'};
    font-size: ${({ theme, fontSize }) => fontSize || theme.font.size[200]};
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

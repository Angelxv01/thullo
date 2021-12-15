import React from "react";
import styled, { useTheme } from "styled-components";
import { Flex, Text } from "../common/index";

interface Ratio {
  ratio?: string;
}

export const Cover = styled.img<Ratio>`
  aspect-ratio: ${({ ratio }) => ratio || "5 / 3"};
  border-radius: ${({ theme }) => theme.border.radius[1]};
`;

export const Title = ({ children }: { children: React.ReactChild }) => {
  const theme = useTheme();
  return (
    <Text
      fontFamily={theme.font.family.secondary}
      fontWeight="400"
      fontSize={theme.font.size["500"]}
      lineHeight={theme.lineHeight[2]}
      color="DARK"
    >
      {children}
    </Text>
  );
};

export const Labels = styled(Flex)`
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.25em;
`;

export const StatusBar = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;

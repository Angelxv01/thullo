import React from "react";
import { useTheme } from "styled-components";
import { Text } from "../common";
import { StyledInfoLabel } from "../common/InfoLabel";
import StyledCard from "./StyledCard";

const Card = ({
  children,
  description,
  onClick,
}: {
  children: React.ReactNode;
  description: string;
  onClick: () => void;
}) => {
  const theme = useTheme();
  return (
    <StyledCard space="0.25em" onClick={onClick}>
      <StyledInfoLabel color="GRAY2" fontSize={theme.font.size[300]}>
        {children}
      </StyledInfoLabel>
      <Text color="GRAY3" fontSize={theme.font.size[200]}>
        {description}
      </Text>
    </StyledCard>
  );
};

export default Card;

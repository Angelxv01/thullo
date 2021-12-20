import React from "react";
import styled from "styled-components";
import { getAbbreviation } from "../../utils/formatting";

interface Source {
  coverId: string;
}

const StyledImageCover = styled.div<Source>`
  background-size: cover;
  border-radius: 8px;
  background-image: url(https://source.unsplash.com/${({ coverId: coverId }) =>
    coverId});
`;

const StyledTextCover = styled.div`
  display: grid;
  align-content: center;
  text-align: center;
  background-color: hsl(${({ theme }) => theme.color.GRAY5});
  color: hsl(${({ theme }) => theme.color.GRAY2});
  border-radius: ${({ theme }) => theme.border.radius[1]};
`;

const AttachmentCover = ({
  coverId,
  title,
}: {
  coverId?: string;
  title: string;
}) => {
  if (coverId) {
    return <StyledImageCover coverId={coverId} />;
  }
  return <StyledTextCover>{getAbbreviation(title)}</StyledTextCover>;
};

export default AttachmentCover;

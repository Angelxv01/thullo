import React from "react";
import styled from "styled-components";
import { getAbbreviation } from "../../utils/formatting";

const StyledAvatar = styled.img`
  width: 2rem;
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.border.radius[1]};
  cursor: pointer;
`;

const TextAvatar = styled.div`
  width: 2rem;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  color: hsl(${({ theme }) => theme.color.WHITE});
  background-color: hsl(${({ theme }) => theme.color.GRAY4});
  border-radius: ${({ theme }) => theme.border.radius[1]};
  cursor: pointer;
`;

const Avatar = ({ id, username }: { id?: string; username: string }) => {
  if (!id) return <TextAvatar>{getAbbreviation(username)}</TextAvatar>;
  return <StyledAvatar src={`https://source.unsplash.com/${id}/150x150`} />;
};

export default Avatar;

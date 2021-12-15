import React from "react";
import styled from "styled-components";

const StyledAvatar = styled.img`
  flex: 1 0 2rem;
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
  if (!id)
    return (
      <TextAvatar>
        {username
          .split(" ")
          .reduce((acc, word) => (acc += word[0]), "")
          .substring(0, 2)}
      </TextAvatar>
    );
  return <StyledAvatar src={`https://source.unsplash.com/${id}/150x150`} />;
};

export default Avatar;

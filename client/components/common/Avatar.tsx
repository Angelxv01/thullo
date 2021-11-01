import React from 'react';
import styled from 'styled-components';

const StyledAvatar = styled.img`
  width: 2rem;
  aspect-ratio: 1;
  border-radius: ${({theme}) => theme.border.radius[1]};
  cursor: pointer;
`;

const Avatar = ({id}: {id?: string}) => {
  if (!id)
    return <StyledAvatar src="https://source.unsplash.com/random/150x150" />;
  return <StyledAvatar src={`https://source.unsplash.com/${id}/150x150`} />;
};

export default Avatar;

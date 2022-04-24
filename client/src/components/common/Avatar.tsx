import React from "react";
import styled from "styled-components";
import { getAbbreviation } from "../../utils/formatting";

const TextAvatar = styled.div.attrs({
  className:
    "rounded-lg bg-gray-400 w-8 aspect-square flex justify-center items-center text-white",
})``;

const ImageAvatar = styled.img.attrs({
  className: "rounded-lg object-cover object-center w-8 aspect-square",
})``;

const Avatar = ({ username, id }: { username: string; id?: string }) => {
  if (!id) return <TextAvatar>{getAbbreviation(username)}</TextAvatar>;
  return <ImageAvatar src={`https://source.unsplash.com/${id}/150x150`} />;
};

export default Avatar;

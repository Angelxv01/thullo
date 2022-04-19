import React from "react";
import { getAbbreviation } from "../../utils/formatting";

const TextAvatar = ({ children }: { children: React.ReactChild }) => (
  <div className="rounded-lg cursor-pointer bg-gray-400 w-8 aspect-square flex justify-center items-center font-semibold">
    {children}
  </div>
);

const ImageAvatar = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    className="rounded-lg object-cover object-center w-8 aspect-square"
    {...props}
  />
);

const Avatar = ({ id, username }: { id?: string; username: string }) => {
  if (!id) return <TextAvatar>{getAbbreviation(username)}</TextAvatar>;
  return <ImageAvatar src={`https://source.unsplash.com/${id}/150x150`} />;
};

export default Avatar;

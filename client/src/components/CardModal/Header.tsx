import React from "react";
import styled from "styled-components";
import { Flow, Button, Icon, Text } from "../common";

interface Image {
  id?: string;
  url?: string;
}

const Cover = styled.div<Image>`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-image: url(${({ url }) => url});
  border-radius: ${({ theme }) => theme.border.radius[2]};
`;

const Header = ({
  coverId,
  title,
  listName,
  setVisibility,
}: {
  coverId?: string;
  title: string;
  listName: string;
  setVisibility: () => void;
}) => {
  return (
    <Flow as="header" style={{ display: "flex", flexDirection: "column" }}>
      <Button.Squared
        onClick={setVisibility}
        style={{
          alignSelf: "flex-end",
          marginBottom: "-3em",
          marginRight: "-0.5em",
          zIndex: 5,
          fontSize: "1em",
        }}
      >
        <Icon.Close />
      </Button.Squared>
      {coverId && <Cover url={coverId} />}
      <Text>{title}</Text>
      <Text>
        in list
        <Text as="span"> {listName}</Text>
      </Text>
    </Flow>
  );
};

export default Header;

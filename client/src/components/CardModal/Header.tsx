import React from "react";
import styled, { useTheme } from "styled-components";
import { Button, Icon, Text, Flex } from "../common";

interface Image {
  id?: string;
  url?: string;
}

const Cover = styled.div<Image>`
  width: 100%;
  height: 130px;
  background-size: cover;
  background-position: center;
  background-image: url(${({ url }) => url});
  border-radius: ${({ theme }) => theme.border.radius[2]};
`;

const StyledHeader = styled(Flex)`
  flex-direction: column;

  .offset-button {
    margin-bottom: -3em;
    margin-right: -0.5em;
    align-self: flex-end;
    z-index: 5;
  }
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
  const theme = useTheme();
  return (
    <StyledHeader space="0.5em">
      <Button.Squared className="offset-button" onClick={setVisibility}>
        <Icon.Close />
      </Button.Squared>
      {coverId && <Cover url={coverId} />}
      <Text
        fontSize={theme.font.size[500]}
        fontFamily={theme.font.family.secondary}
        color="DARK"
        lineHeight={theme.lineHeight[2]}
      >
        {title}
      </Text>
      <Text
        fontSize={theme.font.size[200]}
        lineHeight={theme.lineHeight[0]}
        fontWeight="600"
        color="GRAY4"
      >
        in list
        <Text as="span" color="DARK">
          {" " + listName}
        </Text>
      </Text>
    </StyledHeader>
  );
};

export default Header;

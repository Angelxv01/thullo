import React, { ChangeEvent } from "react";
import styled, { useTheme } from "styled-components";
import { Button, Icon, Text, Flex, Flow } from "../common";

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

const StyledHeader = styled(Flex)<{ hasCover?: boolean }>`
  flex-direction: column;
  gap: 2em;

  .offset-button {
    align-self: flex-end;
    z-index: 6;
    ${({ hasCover }) => hasCover && "margin: -1em -0.5em -3.5em 0;"}
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
  const handleTitleChange = (e: ChangeEvent<HTMLParagraphElement>) =>
    console.log(e.target.outerText);
  return (
    <StyledHeader space="0.5em" hasCover={Boolean(coverId)}>
      {/* Offsettable button */}
      <Button.Squared className="offset-button" onClick={setVisibility}>
        <Icon.Close />
      </Button.Squared>

      {/* Cover Image */}
      {coverId && <Cover url={coverId} />}

      {/* Headings */}
      <Flow space="0.5em">
        <Text
          fontSize={theme.font.size[500]}
          fontFamily={theme.font.family.secondary}
          color="DARK"
          lineHeight={theme.lineHeight[2]}
          as="h1"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
        >
          {title}
        </Text>
        <Text
          fontSize={theme.font.size[200]}
          lineHeight={theme.lineHeight[0]}
          fontWeight="600"
          color="GRAY4"
          as="h2"
        >
          in list
          <Text as="span" color="DARK">
            {" " + listName}
          </Text>
        </Text>
      </Flow>
    </StyledHeader>
  );
};

export default Header;

import { useMutation } from "@apollo/client";
import React, { ChangeEvent } from "react";
import styled, { useTheme } from "styled-components";
import { CreateCardInput, CREATE_CARD } from "../../graphql/mutation";
import { MASTER } from "../../graphql/query";
import { Button, Icon, Text, Flex, Flow } from "../common";
import * as Gql from "../../gqlTypes";
import { useParams } from "react-router-dom";

interface Image {
  id?: string;
  url?: string;
}

export const Cover = styled.div<Image>`
  width: 100%;
  height: 130px;
  background-size: cover;
  background-position: center;
  background-image: url(${({ url }) => url});
  border-radius: ${({ theme }) => theme.border.radius[2]};
`;

export const StyledHeader = styled(Flex)<{ hasCover?: boolean }>`
  flex-direction: column;
  gap: 2em;

  & .offset-button {
    align-self: flex-end;
    z-index: 6;
    ${({ hasCover }) => hasCover && "margin: -1em -0.5em -3.5em 0;"}
  }
`;

const Header = ({
  card,
  setVisibility,
}: {
  card: Gql.Card;
  setVisibility: () => void;
}) => {
  const { id } = useParams();
  if (!id) return null;
  const theme = useTheme();
  const [changeTitle] = useMutation<{ createCard: Gql.Card }, CreateCardInput>(
    CREATE_CARD,
    {
      refetchQueries: [
        {
          query: MASTER,
          fetchPolicy: "network-only",
          variables: { id },
        },
      ],
    }
  );
  const handleTitleChange = (e: ChangeEvent<HTMLParagraphElement>) =>
    changeTitle({
      variables: {
        data: {
          listId: card.list.id,
          boardId: id,
          id: card.id,
          title: e.target.outerText,
        },
      },
    });
  return (
    <StyledHeader space="0.5em" hasCover={Boolean(card.coverId)}>
      {/* Offsettable button */}
      <Button.Squared className="offset-button" onClick={setVisibility}>
        <Icon.Close />
      </Button.Squared>

      {/* Cover Image */}
      {card.coverId && <Cover url={card.coverId} />}

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
          {card.title}
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
            {" " + card.list.name}
          </Text>
        </Text>
      </Flow>
    </StyledHeader>
  );
};

export default Header;

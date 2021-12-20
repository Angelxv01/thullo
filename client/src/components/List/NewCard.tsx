import { useMutation } from "@apollo/client";
import React from "react";
import styled, { useTheme } from "styled-components";
import { CreateCardInput, CREATE_CARD } from "../../graphql/mutation";
import { MASTER } from "../../graphql/query";
import useTextArea from "../../hooks/useTextArea";
import { Button, Flow, TextArea, Text } from "../common";
import * as Gql from "../../gqlTypes";

const StyledNewCard = styled(Flow)`
  background-color: hsl(${({ theme }) => theme.color.WHITE});
  border: 1px solid hsl(${({ theme }) => theme.color.GRAY5});
  border-radius: ${({ theme }) => theme.border.radius[2]};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1em;
  max-width: 100%;
  font-size: ${({ theme }) => theme.font.size[400]};
`;

const NewCard = ({
  listId,
  setVisibility,
}: {
  listId: string;
  setVisibility: () => void;
}) => {
  const theme = useTheme();
  const controller = useTextArea();
  const [create] = useMutation<{ createCard: Gql.Card }, CreateCardInput>(
    CREATE_CARD,
    {
      refetchQueries: [
        {
          query: MASTER,
          fetchPolicy: "network-only",
          variables: { id: "6182d8c9bba2b2dfab68119d" },
        },
      ],
    }
  );

  const createCard = async () => {
    await create({
      variables: {
        cardData: {
          title: controller.value,
          listId,
          boardId: "6182d8c9bba2b2dfab68119d",
        },
      },
    });
    setVisibility();
  };

  return (
    <StyledNewCard>
      <TextArea {...controller} placeholder="Enter a title for this card..." />
      <Button.Colored
        backgroundColor="GREEN1"
        style={{ padding: "0.4em 1em" }}
        onClick={createCard}
      >
        <Text
          fontFamily={theme.font.family.secondary}
          fontSize={theme.font.size[200]}
        >
          Save
        </Text>
      </Button.Colored>
    </StyledNewCard>
  );
};

export default NewCard;

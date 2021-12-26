import { useMutation } from "@apollo/client";
import React from "react";
import { css } from "styled-components";
import { CreateCardInput, CREATE_CARD } from "../../graphql/mutation";
import { MASTER } from "../../graphql/query";
import useTextArea from "../../hooks/useTextArea";
import useVisibility from "../../hooks/useVisiblity";
import theme from "../../style/theme";
import { Flow, Flex, Icon, Button, TextArea, Text } from "../common";
import InfoLabel from "../common/InfoLabel";
import * as Gql from "../../gqlTypes";

const DescriptionSection = ({ card }: { card: Gql.Card }) => {
  const [edit, setEdit] = useVisibility(true);
  const descriptionController = useTextArea(
    card.description || "There's no description yet"
  );
  const [changeDescription] = useMutation<
    { createCard: Gql.Card },
    CreateCardInput
  >(CREATE_CARD, {
    refetchQueries: [
      {
        query: MASTER,
        variables: { id: "6182d8c9bba2b2dfab68119d" },
      },
    ],
  });
  const handleDescriptionChange = async () =>
    changeDescription({
      variables: {
        data: {
          listId: card.list.id,
          boardId: "6182d8c9bba2b2dfab68119d",
          id: card.id,
          description: descriptionController.value,
        },
      },
    });
  const descriptionStyle = css`
    color: hsl(${({ theme }) => theme.color.DARK});
    font-size: ${({ theme }) => theme.font.size[400]};
  `;

  return (
    <Flow>
      {/* Logo + Edit button */}
      <Flex>
        <InfoLabel text="Description">
          <Icon.Description />
        </InfoLabel>
        <Button.Outline
          color="GRAY3"
          style={{ padding: "0.25em 1em" }}
          onClick={setEdit}
        >
          <Icon.Edit style={{ fontSize: theme.font.size[200] }} />
          <Text fontSize={theme.font.size[200]}>Edit</Text>
        </Button.Outline>
      </Flex>

      {/* Content */}
      <TextArea
        onBlur={handleDescriptionChange}
        disabled={edit}
        {...descriptionController}
        specialStyle={descriptionStyle}
      />
    </Flow>
  );
};

export default DescriptionSection;

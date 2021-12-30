import React from "react";
import { useTheme } from "styled-components";
import Card from "./Card";
import { Flow, Icon, Text } from "../common";
import { useMutation } from "@apollo/client";
import { BoardInput, CHANGE_VISIBILITY } from "../../graphql/mutation";
import { MASTER } from "../../graphql/query";
import * as Gql from "../../gqlTypes";
import { useParams } from "react-router-dom";

const VisibilityCard = ({ setVisible }: { setVisible: () => void }) => {
  const { id } = useParams();
  const theme = useTheme();

  const [changeVisibility] = useMutation<{ creteBoard: Gql.Board }, BoardInput>(
    CHANGE_VISIBILITY,
    {
      refetchQueries: [
        {
          query: MASTER,
          variables: { id },
        },
      ],
    }
  );

  const handleChangeVisibility = (visibility: Gql.Visibility) => {
    changeVisibility({ variables: { data: { id, visibility } } });
    setVisible();
  };

  return (
    <Flow space="0.5em">
      <Flow space="1px">
        <Text color="GRAY2" fontWeight="600">
          Visibility
        </Text>
        <Text
          color="GRAY3"
          fontSize={theme.font.size[200]}
          lineHeight={theme.lineHeight[0]}
        >
          Choose who can see to this board.
        </Text>
      </Flow>

      <Card
        description="Anyone on the internet can see this."
        onClick={() => handleChangeVisibility(Gql.Visibility.PUBLIC)}
      >
        <Icon.Public />
        <Text fontWeight="bold">Public</Text>
      </Card>
      <Card
        onClick={() => handleChangeVisibility(Gql.Visibility.PRIVATE)}
        description="Only board members can see this"
      >
        <Icon.Lock />
        <Text fontWeight="bold">Private</Text>
      </Card>
    </Flow>
  );
};

export default VisibilityCard;

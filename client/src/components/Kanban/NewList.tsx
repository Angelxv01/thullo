import { useMutation } from "@apollo/client";
import React from "react";
import { CreateListInput, CREATE_LIST } from "../../graphql/mutation";
import { MASTER } from "../../graphql/query";
import useInput from "../../hooks/useInput";
import { Absolute, InputGroup, Button, Icon } from "../common";
import * as Gql from "../../gqlTypes";
import { useParams } from "react-router-dom";

const NewList = ({ setVisible }: { setVisible: () => void }) => {
  const { id } = useParams();
  if (!id) return null;
  const inputController = useInput("text");

  const [createList] = useMutation<{ createList: Gql.List }, CreateListInput>(
    CREATE_LIST,
    {
      refetchQueries: [
        {
          query: MASTER,
          variables: { id },
        },
      ],
    }
  );

  const createListHandler = () => {
    createList({
      variables: {
        data: {
          name: inputController.value,
          boardId: id,
        },
      },
    });
    setVisible();
  };

  return (
    <Absolute style={{ width: "100%", marginTop: "1em" }}>
      <InputGroup
        width="100%"
        props={{ ...inputController, style: { fontSize: "1.25em" } }}
      >
        <Button.Squared onClick={createListHandler}>
          <Icon.Add />
        </Button.Squared>
      </InputGroup>
    </Absolute>
  );
};

export default NewList;

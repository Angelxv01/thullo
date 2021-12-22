import { useMutation } from "@apollo/client";
import React from "react";
import { CreateListInput, CREATE_LIST } from "../../graphql/mutation";
import { MASTER } from "../../graphql/query";
import useInput from "../../hooks/useInput";
import { Absolute, InputGroup, Button, Icon } from "../common";
import * as Gql from "../../gqlTypes";

const NewList = ({ setVisible }: { setVisible: () => void }) => {
  const inputController = useInput("text");

  const [createList] = useMutation<{ createList: Gql.List }, CreateListInput>(
    CREATE_LIST,
    {
      refetchQueries: [
        {
          query: MASTER,
          variables: { id: "6182d8c9bba2b2dfab68119d" },
        },
      ],
    }
  );

  const createListHandler = async () => {
    await createList({
      variables: {
        list: {
          name: inputController.value,
          boardId: "6182d8c9bba2b2dfab68119d",
        },
      },
    });
    setVisible();
  };

  return (
    <Absolute style={{ width: "100%", marginTop: "1em" }}>
      <InputGroup width="100%" props={inputController}>
        <Button.Squared onClick={createListHandler}>
          <Icon.Add />
        </Button.Squared>
      </InputGroup>
    </Absolute>
  );
};

export default NewList;

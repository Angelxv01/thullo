import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useTheme } from "styled-components";
import * as Gql from "../../gqlTypes";
import {
  AddLabelInput,
  ADD_LABEL,
  CreateLabelInput,
  CREATE_LABEL,
} from "../../graphql/mutation";
import { Labels } from "../Card/Utils";
import { Flow, Icon, Label, Button, Text, Flex } from "../common";
import InfoLabel from "../common/InfoLabel";
import { CARD } from "../../graphql/query";

const previewDefault = { text: "New label", color: Gql.Color.BLUE1 };

const LabelModal = ({
  cardId,
  available,
  active,
}: {
  available: Gql.Label[];
  active: Gql.Label[];
  cardId: string;
}) => {
  const theme = useTheme();
  const [addLabel] = useMutation<{ addLabel: Gql.Card }, AddLabelInput>(
    ADD_LABEL,
    { refetchQueries: [{ query: CARD, variables: { id: cardId } }] }
  );
  const [createLabel] = useMutation<
    { createLabel: Gql.Label },
    CreateLabelInput
  >(CREATE_LABEL, {
    refetchQueries: [{ query: CARD, variables: { id: cardId } }],
  });

  const [preview, setPreview] = useState<{
    text: string;
    color: Gql.Color;
  }>(previewDefault);
  const addLabelHandler = (id: string) => {
    addLabel({ variables: { data: { id, cardId } } });
  };

  const createLabelHandler = () => {
    createLabel({
      variables: {
        data: { boardId: "6182d8c9bba2b2dfab68119d", cardId, ...preview },
      },
    });
    setPreview(previewDefault);
  };

  return (
    <Flow
      style={{
        position: "absolute",
        backgroundColor: "white",
        padding: "1em",
        border: "1px solid #E0E0E0",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        zIndex: 7,
        borderRadius: "12px",
        marginTop: "1em",
      }}
    >
      {/* Header */}
      <div>
        <Text>Label</Text>
        <Text>Select a name and a color</Text>
      </div>

      {/* Label previewer */}
      {preview.text.length > 0 && (
        <div>
          <InfoLabel text="Preview">
            <Icon.Label />
          </InfoLabel>
          <Flex>
            <Label color={preview.color}>{preview.text}</Label>
          </Flex>
        </div>
      )}

      {/* Labels */}
      <div style={{ filter: "drop-shadow(rgba(0, 0, 0, 0.1) 0px 4px 12px)" }}>
        <input
          type="text"
          style={{
            width: "100%",
            outline: 0,
            border: 0,
            padding: "0.5rem 0.75rem",
            borderRadius: "8px",
            fontSize: "10px",
            lineHeight: "15px",
          }}
          placeholder="Label..."
          onChange={({ target }) =>
            setPreview({ ...preview, text: target.value })
          }
          value={preview.text}
        />
      </div>
      <div
        style={{
          display: "grid",
          grid: "repeat(3, 2.5rem) / repeat(4, 4rem)",
          gap: "0.5em",
        }}
      >
        {Object.keys(Gql.Color).map((color) => (
          <button
            key={color}
            style={{
              backgroundColor: `hsl(${theme.color[color]})`,
              outline: 0,
              border: 0,
              borderRadius: "4px",
            }}
            onClick={() =>
              setPreview({
                ...preview,
                color: color as Gql.Color,
              })
            }
          ></button>
        ))}
      </div>

      <Flow style={{ alignItems: "center" }} space="0.5em">
        {available.length > 0 && (
          <>
            <InfoLabel text="Available">
              <Icon.Label />
            </InfoLabel>
            <Labels style={{ gap: "1em" }}>
              {available.map((label) => (
                <Label
                  color={label.color}
                  key={label.id}
                  onClick={() => addLabelHandler(label.id)}
                >
                  {label.text}
                </Label>
              ))}
            </Labels>
          </>
        )}
        {active.length > 0 && (
          <>
            <InfoLabel text="Active">
              <Icon.Label />
            </InfoLabel>
            <Labels style={{ gap: "1em" }}>
              {active.map((label) => (
                <Label
                  color={label.color}
                  key={label.id}
                  onClick={() => addLabelHandler(label.id)}
                >
                  {label.text}
                </Label>
              ))}
            </Labels>
          </>
        )}
        <div style={{ textAlign: "center", paddingTop: "1em" }}>
          <Button.Colored
            style={{ padding: "0.75em 2em" }}
            onClick={createLabelHandler}
          >
            Add
          </Button.Colored>
        </div>
      </Flow>
    </Flow>
  );
};

export default LabelModal;

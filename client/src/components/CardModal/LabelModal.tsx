import React from "react";
import { useTheme } from "styled-components";
import * as Gql from "../../gqlTypes";
import { Labels } from "../Card/Utils";
import { Flow, Icon, Label, Button, Text } from "../common";
import InfoLabel from "../common/InfoLabel";

const LabelModal = ({ labels }: { labels: Gql.Label[] }) => {
  const theme = useTheme();
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
          ></button>
        ))}
      </div>

      <Flow style={{ alignItems: "center" }} space="0.5em">
        <InfoLabel text="Available">
          <Icon.Label />
        </InfoLabel>
        <Labels style={{ gap: "1em" }}>
          {labels.map((label) => (
            <Label color={label.color} key={label.id}>
              {label.text}
            </Label>
          ))}
        </Labels>
        <div style={{ textAlign: "center", paddingTop: "1em" }}>
          <Button.Colored style={{ padding: "0.75em 2em" }}>Add</Button.Colored>
        </div>
      </Flow>
    </Flow>
  );
};

export default LabelModal;

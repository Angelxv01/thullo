import React from "react";
import { useTheme } from "styled-components";
import Toggle from "../Toggle";
import VisibilityCard from "../VisibilityCard";
import VisibilityBadge from "./Badge";
import { Gql } from "../../../../types";

const VisibilityModal = ({ visibility }: { visibility: Gql.Visibility }) => {
  const theme = useTheme();
  return (
    <Toggle
      props={{
        style: {
          marginTop: "1em",
          backgroundColor: "white",
          zIndex: theme.z.HEADER_POPUP,
          minWidth: "20em",
          padding: "1em",
          border: "1px solid #E0E0E0",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          borderRadius: theme.border.radius[2],
        },
      }}
    >
      <VisibilityBadge visibility={visibility} />
      <VisibilityCard />
    </Toggle>
  );
};

export default VisibilityModal;

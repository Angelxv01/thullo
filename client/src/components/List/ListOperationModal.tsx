import React from "react";
import { useTheme } from "styled-components";
import { Icon } from "../common";
import ListOperation from "../ListOperation";
import Toggle from "../Toggle";
import * as Gql from "../../gqlTypes";

const ListOperationModal = ({ list }: { list: Gql.List }) => {
  const theme = useTheme();
  const ToggleStyle = {
    style: {
      zIndex: theme.z.BOARD_POPUP,
      backgroundColor: `hsl(${theme.color.WHITE})`,
      minWidth: "13em",
      padding: "1em",
      border: "1px solid #E0E0E0",
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
      borderRadius: theme.border.radius[2],
    },
  };
  return (
    <Toggle props={ToggleStyle}>
      <Icon.MoreHoriz />
      <ListOperation list={list} />
    </Toggle>
  );
};

export default ListOperationModal;

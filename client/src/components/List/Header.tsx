import React from "react";
import { useTheme } from "styled-components";
import { Flex, Text, Relative } from "../common";
import ListOperationModal from "./ListOperationModal";
import * as Gql from "../../gqlTypes";

const Header = ({ list }: { list: Gql.List }) => {
  const theme = useTheme();

  return (
    <Relative>
      <Flex style={{ alignItems: "center", justifyContent: "space-between" }}>
        <Text lineHeight={theme.lineHeight[2]} fontSize={theme.font.size[400]}>
          {list.name}
        </Text>
        <ListOperationModal list={list} />
      </Flex>
    </Relative>
  );
};

export default Header;

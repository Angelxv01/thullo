import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Flex } from "../common";
import { CARD, Data, MASTER } from "../../graphql/query";
import * as Gql from "../../gqlTypes";
import Header from "./Header";
import Main from "./Main";
import Aside from "./Aside";

const CardModal = ({
  setVisibility,
  id,
}: {
  setVisibility: () => void;
  id: string;
}) => {
  const theme = useTheme();
  const { data } = useQuery<{ card: Gql.Card }, { id: string }>(CARD, {
    variables: { id },
  });
  const ctx = useQuery<Data, { id: string }>(MASTER, {
    variables: { id: "6182d8c9bba2b2dfab68119d" },
    fetchPolicy: "cache-only",
  });

  const [card, setCard] = useState<Gql.Card | undefined>();

  useEffect(() => {
    if (data) {
      setCard(data.card);
    }
  }, [data]);

  if (!(card && ctx.data)) return null;

  return (
    <div
      style={{
        margin: "0",
        backgroundColor: `hsl(${theme.color.DARK} / 0.1)`,
        position: "fixed",
        inset: "0",
        zIndex: theme.z.CARD,
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          backgroundColor: "white",
          margin: "1em auto",
          width: "50%",
          padding: "2em 1.75em",
        }}
      >
        {/* Header */}
        <Header
          setVisibility={setVisibility}
          coverId={card.coverId}
          title={card.title}
          listName={card.list.name}
        />
        {/* Card Content */}
        <Flex>
          <Main card={card} />
          <Aside card={card} />
        </Flex>
      </div>
    </div>
  );
};

export default CardModal;

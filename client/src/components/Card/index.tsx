import React, { DragEventHandler, useState } from "react";
import * as Gql from "../../gqlTypes";
import Avatars from "../Avatars";
import { Button, Flex, Icon, Label } from "../common";
import { Cover, Labels, StatusBar, Title } from "./Utils";
import StyledCard from "./StyledCard";
import InfoLabel from "../common/InfoLabel";
import useVisibility from "../../hooks/useVisiblity";
import CardModal from "../CardModal";

const Card = ({
  card,
  onDragStart,
}: {
  card: Gql.Card;
  onDragStart: DragEventHandler<HTMLDivElement>;
}) => {
  const [visibility, setVisibility] = useVisibility();
  const [leave, setLeave] = useState<boolean>(false);

  const style = leave
    ? {
        background: "#E2E8F6",
        border: "1px dashed #2F80ED",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        borderRadius: "12px",
      }
    : {};

  return (
    <div style={style}>
      <StyledCard
        draggable={true}
        onDragStart={onDragStart}
        onClick={setVisibility}
      >
        {card.coverId && <Cover src={card.coverId} />}
        <Title>{card.title}</Title>
        <Labels>
          {card.labels.map((label) => (
            <Label color={label.color} key={label.id}>
              {label.text}
            </Label>
          ))}
        </Labels>

        <StatusBar>
          {/* Avatars */}
          <Avatars members={card.members}>
            <Button.Squared>
              <Icon.Add />
            </Button.Squared>
          </Avatars>
          {/* InfoLabel */}
          <Flex space="0.5rem">
            {card.comments.length > 0 && (
              <InfoLabel text={card.comments.length}>
                <Icon.Comment />
              </InfoLabel>
            )}
            {card.attachments.length > 0 && (
              <InfoLabel text={card.attachments.length}>
                <Icon.AttachFile />
              </InfoLabel>
            )}
          </Flex>
        </StatusBar>
      </StyledCard>
      {visibility && <CardModal setVisibility={setVisibility} id={card.id} />}
    </div>
  );
};

export default Card;

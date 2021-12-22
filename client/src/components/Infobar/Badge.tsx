import React, { HTMLAttributes } from "react";
import { Visibility } from "../../gqlTypes";
import { Button, Icon, Text } from "../common";

const VisibilityBadge = (
  props: HTMLAttributes<HTMLButtonElement> & { visibility: string }
) => {
  const { visibility, ...prop } = props;

  return visibility === Visibility.PRIVATE ? (
    <Private {...prop} />
  ) : (
    <Public {...prop} />
  );
};

const Private = (props: HTMLAttributes<HTMLButtonElement>) => (
  <Button.Icon {...props}>
    <Icon.Lock />
    <Text>Private</Text>
  </Button.Icon>
);

const Public = (props: HTMLAttributes<HTMLButtonElement>) => (
  <Button.Icon {...props}>
    <Icon.Public />
    <Text>Public</Text>
  </Button.Icon>
);

export default VisibilityBadge;

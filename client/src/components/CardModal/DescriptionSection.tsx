import React from "react";
import { css } from "styled-components";
import useTextArea from "../../hooks/useTextArea";
import useVisibility from "../../hooks/useVisiblity";
import theme from "../../style/theme";
import { Flow, Flex, Icon, Button, TextArea, Text } from "../common";
import InfoLabel from "../common/InfoLabel";

const DescriptionSection = ({ description }: { description: string }) => {
  const [edit, setEdit] = useVisibility();
  const descriptionController = useTextArea(
    description || "There's no description yet"
  );

  const descriptionStyle = css`
    color: hsl(${({ theme }) => theme.color.DARK});
    fontsize: ${({ theme }) => theme.font.size[400]};
  `;

  return (
    <Flow>
      {/* Logo + Edit button */}
      <Flex>
        <InfoLabel text="Description">
          <Icon.Description />
        </InfoLabel>
        <Button.Outline
          color="GRAY3"
          style={{ padding: "0.25em 1em" }}
          onClick={setEdit}
        >
          <Icon.Edit style={{ fontSize: theme.font.size[200] }} />
          <Text fontSize={theme.font.size[200]}>Edit</Text>
        </Button.Outline>
      </Flex>

      {/* Content */}
      <TextArea
        disabled={edit}
        {...descriptionController}
        specialStyle={descriptionStyle}
      />
    </Flow>
  );
};

export default DescriptionSection;

import React from "react";
import styled from "styled-components";
import VisibilityCard from "../VisibilityCard";
import VisibilityBadge from "./Badge";
import * as Gql from "../../gqlTypes";
import { Absolute, Relative } from "../common";
import useVisibility from "../../hooks/useVisiblity";

const StyledVisibilityModal = styled(Absolute)`
  margin-top: 1em;
  background-color: hsl(${({ theme }) => theme.color.WHITE});
  z-index: ${({ theme }) => theme.z.HEADER_POPUP};
  min-width: 20em;
  padding: 1em;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: ${({ theme }) => theme.border.radius[2]};
`;

const VisibilityModal = ({ visibility }: { visibility: Gql.Visibility }) => {
  const [visible, setVisible] = useVisibility();
  return (
    <Relative>
      <VisibilityBadge visibility={visibility} onClick={setVisible} />
      {visible && (
        <StyledVisibilityModal>
          <VisibilityCard setVisible={setVisible} />
        </StyledVisibilityModal>
      )}
    </Relative>
  );
};

export default VisibilityModal;

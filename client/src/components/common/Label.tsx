import styled from "styled-components";

const Label = styled.div.attrs({
  className: "font-accent text-sm rounded-2xl capitalize py-1 px-3",
})<{ color?: string }>`
  ${({ theme, color }) => {
    const bgColor =
      color && theme.color[color] ? theme.color[color] : theme.color.BLUE1;
    const applyColor = theme.color[color || "BLUE1"];

    return {
      color: `hsl(${applyColor})`,
      backgroundColor: `hsl(${bgColor}/ 0.2)`,
    };
  }}
`;

export default Label;

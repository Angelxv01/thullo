import styled from 'styled-components';

interface Color {
  color?: string;
}
const ColoredButton = styled.button<Color>`
  border-radius: ${({theme}) => theme.border.radius[1]};
  background-color: hsl(
    ${({color, theme}) => (color && theme.color[color]) || theme.color.BLUE1}
  );
  color: hsl(${({theme}) => theme.color.WHITE});
  border: ${({theme}) => theme.font.size[1]} solid
    hsl(
      ${({color, theme}) => (color && theme.color[color]) || theme.color.BLUE1}
    );
  padding: 0.75em 2em;

  &:hover {
    background-color: hsl(${({theme}) => theme.color.WHITE});
    color: hsl(
      ${({color, theme}) => (color && theme.color[color]) || theme.color.BLUE1}
    );
  }
`;

export default ColoredButton;

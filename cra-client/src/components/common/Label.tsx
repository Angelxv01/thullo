import styled from 'styled-components';

interface ILabelStyle {
  color?: string;
}

const Label = styled.div<ILabelStyle>`
  font-family: ${({theme}) => theme.font.family.secondary};
  font-size: ${({theme}) => theme.font.size[200]};
  border-radius: ${({theme}) => theme.border.radius[1]};
  padding: 0.2em 1em;
  line-height: ${({theme}) => theme.lineHeight[0]};
  color: hsl(${({color, theme}) => theme.color[color || 'BLUE1']});
  background-color: hsl(
    ${({color, theme}) =>
        color && theme.color[color] ? theme.color[color] : theme.color.BLUE1} /
      0.2
  );
  cursor: pointer;
  text-transform: capitalize;
`;

export default Label;

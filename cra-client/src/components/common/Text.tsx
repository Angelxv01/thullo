import styled from 'styled-components';

interface ITextStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  color?: string;
}

const Text = styled.p<ITextStyle>`
  font-family: ${({ fontFamily }) => fontFamily || 'inherit'};
  font-size: ${({ fontSize }) => fontSize || 'inherit'};
  font-weight: ${({ fontWeight }) => fontWeight || 'inherit'};
  line-height: ${({ lineHeight }) => lineHeight || 'inherit'};
  color: ${({ color, theme }) =>
    color && theme.color[color] ? `hsl(${theme.color[color]})` : 'inherit'};
`;

export default Text;

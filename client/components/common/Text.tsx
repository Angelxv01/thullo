import styled from 'styled-components';

interface ITextStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
}

const Text = styled.p<ITextStyle>`
  font-family: ${({fontFamily}) => fontFamily || 'inherit'};
  font-size: ${({fontSize}) => fontSize || 'inherit'};
  font-weight: ${({fontWeight}) => fontWeight || 'inherit'};
`;

export default Text;

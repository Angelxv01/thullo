import styled from 'styled-components';

interface IStyledText {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
}

const Text = styled.p<IStyledText>`
  font-family: ${({fontFamily}) => fontFamily || 'inherit'};
  font-size: ${({fontSize}) => fontSize || 'inherit'};
  font-weight: ${({fontWeight}) => fontWeight || 'inherit'};
`;

export default Text;

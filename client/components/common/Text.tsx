import styled from 'styled-components';

interface IStyledText {
  fontFamily?: string;
  fontSize?: string;
}

const Text = styled.p<IStyledText>`
  font-family: ${({fontFamily}) => fontFamily || 'inherit'};
  font-size: ${({fontSize}) => fontSize || 'inherit'};
`;

export default Text;

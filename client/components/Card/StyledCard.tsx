import styled from 'styled-components';
import {Flow} from '../common';

export default styled(Flow)`
  background-color: hsl(${({theme}) => theme.color.WHITE});
  box-shadow: 0px 4px 12px hsl(${({theme}) => theme.color.DARK} / 0.05);
  border-radius: ${({theme}) => theme.border.radius[2]};
  padding: 1em;
`;

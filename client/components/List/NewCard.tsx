import React from 'react';
import styled, {useTheme} from 'styled-components';
import useTextArea from '../../hooks/useTextArea';
import {Button, Flow, TextArea, Text} from '../common';

const StyledNewCard = styled(Flow)`
  background-color: hsl(${({theme}) => theme.color.WHITE});
  border: 1px solid hsl(${({theme}) => theme.color.GRAY5});
  border-radius: ${({theme}) => theme.border.radius[2]};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1em;
  maxwidth: 100%;
`;

const NewCard = () => {
  const theme = useTheme();
  const controller = useTextArea();
  return (
    <StyledNewCard>
      <TextArea {...controller} placeholder="Enter a title for this card..." />
      <Button.Colored backgroundColor="GREEN1" style={{padding: '0.4em 1em'}}>
        <Text
          fontFamily={theme.font.family.secondary}
          fontSize={theme.font.size[200]}
        >
          Save
        </Text>
      </Button.Colored>
    </StyledNewCard>
  );
};

export default NewCard;

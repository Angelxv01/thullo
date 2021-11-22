import React from 'react';
import {useTheme} from 'styled-components';
import {Flex, Text, Icon} from '../common';

const Header = ({name}: {name: string}) => {
  const theme = useTheme();

  return (
    <Flex style={{alignItems: 'center', justifyContent: 'space-between'}}>
      <Text lineHeight={theme.lineHeight[2]} fontSize={theme.font.size[400]}>
        {name}
      </Text>
      <Icon.MoreHoriz />
    </Flex>
  );
};

export default Header;

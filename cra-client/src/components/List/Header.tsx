import React from 'react';
import { useTheme } from 'styled-components';
import { Flex, Text, Relative } from '../common';
import ListOperationModal from './ListOperationModal';

const Header = ({ name }: { name: string }) => {
  const theme = useTheme();

  return (
    <Relative>
      <Flex style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Text lineHeight={theme.lineHeight[2]} fontSize={theme.font.size[400]}>
          {name}
        </Text>
        <ListOperationModal />
      </Flex>
    </Relative>
  );
};

export default Header;

import React from 'react';
import {useTheme} from 'styled-components';
import {Icon} from '../common';
import ListOperation from '../ListOperation';
import Toggle from '../Toggle';

const ListOperationModal = () => {
  const theme = useTheme();
  const ToggleStyle = {
    style: {
      marginTop: '1em',
      zIndex: theme.z.POPUP,
      backgroundColor: `hsl(${theme.color.WHITE})`,
      minWidth: '13em',
      padding: '0.75em 1em',
      border: '1px solid #E0E0E0',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
      borderRadius: theme.border.radius[2],
    },
  };
  return (
    <Toggle props={ToggleStyle}>
      <Icon.MoreHoriz />
      <ListOperation />
    </Toggle>
  );
};

export default ListOperationModal;

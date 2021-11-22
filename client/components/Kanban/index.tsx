/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {useQuery} from '@apollo/client';
import React from 'react';
import {MASTER} from '../../query';
import * as GqlTypes from '../../../server/graphql/type';
import List from '../List';
import StyledKanban from './StyledKanban';

const Kanban = () => {
  const ctx = useQuery(MASTER, {
    fetchPolicy: 'cache-only',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });
  return (
    <StyledKanban>
      {ctx.data.board.lists.map((list: GqlTypes.List) => (
        <List key={list.id} {...list} />
      ))}
    </StyledKanban>
  );
};

export default Kanban;

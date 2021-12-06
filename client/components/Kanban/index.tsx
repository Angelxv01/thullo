/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {useMutation, useQuery} from '@apollo/client';
import React, {DragEvent} from 'react';
import {MASTER} from '../../graphql/query';
import * as GqlTypes from '../../../server/graphql/type';
import List from '../List';
import StyledKanban from './StyledKanban';
import {Button, Icon} from '../common';
import {CHANGE_LIST} from '../../graphql/mutation';

const Kanban = () => {
  const ctx = useQuery(MASTER, {
    fetchPolicy: 'cache-only',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });
  const [changeList] = useMutation(CHANGE_LIST, {
    refetchQueries: [
      {query: MASTER, variables: {id: '6182d8c9bba2b2dfab68119d'}},
    ],
  });

  const onDragStart = (e: DragEvent<HTMLDivElement>, card: string) => {
    e.dataTransfer.setData('card', card);
  };
  const onDrop = async (e: DragEvent<HTMLDivElement>, list: string) => {
    const card = e.dataTransfer.getData('card');
    await changeList({variables: {data: {cardId: card, listId: list}}});
  };

  return (
    <StyledKanban>
      {ctx.data.board.lists.map((list: GqlTypes.List) => (
        <List
          key={list.id}
          {...list}
          onDragStart={onDragStart}
          onDrop={onDrop}
        />
      ))}
      <div style={{minWidth: '20em'}}>
        <Button.IconColored>
          Add another List
          <Icon.Add />
        </Button.IconColored>
      </div>
    </StyledKanban>
  );
};

export default Kanban;

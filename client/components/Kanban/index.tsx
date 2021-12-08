/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {useMutation, useQuery} from '@apollo/client';
import React, {DragEvent} from 'react';
import {Data, MASTER} from '../../graphql/query';
import * as GqlTypes from '../../../server/graphql/type';
import List from '../List';
import StyledKanban from './StyledKanban';
import {Button, Icon} from '../common';
import {CHANGE_LIST} from '../../graphql/mutation';

const Kanban = () => {
  const ctx = useQuery(MASTER, {
    fetchPolicy: 'cache-and-network',
    variables: {id: '6182d8c9bba2b2dfab68119d'},
  });
  const [changeList] = useMutation<
    {changeList: GqlTypes.Card},
    {data: {cardId: string; listId: string}}
  >(CHANGE_LIST, {
    update: (store, response) => {
      const currentData = store.readQuery<Data>({
        query: MASTER,
        variables: {id: '6182d8c9bba2b2dfab68119d'},
      });
      if (!currentData) return;

      const card = currentData.board.lists.reduce(
        (acc: GqlTypes.Card | undefined, val) => {
          const find = val.cards.find(
            card => card.id === response.data?.changeList.id
          );
          return find || acc;
        },
        undefined
      );

      if (!card) return;
      const lists = currentData.board.lists.map(list => {
        const isNewList = list.id === response.data?.changeList.list.id;
        const isOldList = list.cards.find(card => card.id === card.id);
        if (isNewList)
          return {...list, cards: [...list.cards, {...card, listId: list.id}]};
        if (isOldList)
          return {
            ...list,
            cards: list.cards.filter(
              card => card.id !== response.data?.changeList.id
            ),
          };
        return list;
      });

      store.writeQuery({
        query: MASTER,
        variables: {id: '6182d8c9bba2b2dfab68119d'},
        data: {
          ...currentData,
          board: {...currentData.board, lists},
        },
      });
    },
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

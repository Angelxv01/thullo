// update: (store, response) => {
//   const currentData = store.readQuery<Data>({
//     query: MASTER,
//     variables: {id: '6182d8c9bba2b2dfab68119d'},
//   });
//   if (!currentData) return;
//   const card = currentData.board.lists.reduce(
//     (acc: GqlTypes.Card | undefined, list) => {
//       const find = list.cards.find(
//         card =>
//           card.id === response.data?.changeList.id && card.id !== list.id
//       );
//       return find || acc;
//     },
//     undefined
//   );
//   if (!card) return;
//   const lists = currentData.board.lists.map(list => {
//     const isNewList = list.id === response.data?.changeList.list.id;
//     const isOldList = list.cards.find(card => card.id === card.id);
//     if (isNewList)
//       return {...list, cards: [...list.cards, {...card, listId: list.id}]};
//     if (isOldList)
//       return {
//         ...list,
//         cards: list.cards.filter(
//           card => card.id !== response.data?.changeList.id
//         ),
//       };
//     return list;
//   });
//   store.writeQuery({
//     query: MASTER,
//     variables: {id: '6182d8c9bba2b2dfab68119d'},
//     data: {
//       ...currentData,
//       board: {...currentData.board, lists},
//     },
//   });
// },
export {};

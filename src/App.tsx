import React from 'react';
import { AddNewItem } from './components/AddNewItem';
import { Column } from './components/Column';
import { AppState, useStore } from './state/store';
import { AppContainer } from './styles';

const listSelector = (state: AppState) => state.lists;

export const App = () => {
  const lists = useStore(listSelector);

  return (
    <AppContainer>
      {lists.map(({ id, text }) => (
        <Column key={id} title={text} id={id} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another list'
        onAdd={(text) => console.log(text)}
      />
    </AppContainer>
  );
};

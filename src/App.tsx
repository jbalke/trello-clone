import React from 'react';
import { AppContainer } from './styles';
import { AddNewItem } from './components/AddNewItem';
import { Column } from './components/Column';
import { Card } from './components/Card';

export function App() {
  return (
    <AppContainer>
      <Column title='To Do'>
        <Card text='Generate app scaffold' />
      </Column>
      <Column title='In Progress'>
        <Card text='Learn TypeScript' />
      </Column>
      <Column title='Done'>
        <Card text='Begin to use static typing' />
      </Column>
      <AddNewItem toggleButtonText='+ Add another list' onAdd={console.log} />
    </AppContainer>
  );
}
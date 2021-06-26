import React from 'react';
import { AppState, useStore } from '../state/store';
import { ColumnContainer, ColumnTitle } from '../styles';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';

const listSelector = (state: AppState) => state.getTasksByListId;

type ColumnProps = {
  id: string;
  title: string;
};

export const Column = ({ title, id }: ColumnProps) => {
  const tasks = useStore(listSelector)(id)
  
  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      {tasks.map(({id, text}) => (
        <Card key={id} id={id} text={text} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another task'
        onAdd={(text) => console.log(text)}
        dark
      />
    </ColumnContainer>
  );
};

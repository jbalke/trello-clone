import React from 'react';
import { AppState, useStore } from '../state/store';
import { ColumnContainer, ColumnTitle, TaskList } from '../styles';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { Droppable } from 'react-beautiful-dnd';

const listSelector = (state: AppState) => state.getTasksByListId;
const addTaskToListSelector = (state: AppState) => state.addTaskToList;

type ColumnProps = {
  id: string;
  title: string;
};

export const Column = ({ title, id }: ColumnProps) => {
  const tasks = useStore(listSelector)(id);
  const addTaskToList = useStore(addTaskToListSelector);

  return (
    <ColumnContainer>
      <ColumnTitle>{title}</ColumnTitle>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map(({ id, text }, index) => (
              <Card key={id} id={id} text={text} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
      <AddNewItem
        toggleButtonText='+ Add another task'
        onAdd={(text) => addTaskToList(text, id)}
        dark
      />
    </ColumnContainer>
  );
};

import React from 'react';
import { AddNewItem } from './components/AddNewItem';
import { Column } from './components/Column';
import { AppState, useStore } from './state/store';
import { AppContainer } from './styles';
import { DragDropContext } from 'react-beautiful-dnd';

const listSelector = (state: AppState) => state.lists;
const addListSelector = (state: AppState) => state.addList;
const moveTaskSelector = (state: AppState) => state.moveTask;

export const App = () => {
  const lists = useStore(listSelector);
  const addList = useStore(addListSelector);
  const moveTask = useStore(moveTaskSelector);

  return (
    <AppContainer>
      <DragDropContext
        onDragEnd={({ destination, source, draggableId }) => {
          if (!destination) {
            return;
          }

          if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
          ) {
            return;
          }
          console.log({ destination, source, draggableId });
          moveTask(
            source.droppableId,
            source.index,
            destination.droppableId,
            destination.index
          );
        }}
      >
        {lists.map(({ id, text }) => (
          <Column key={id} title={text} id={id} />
        ))}
      </DragDropContext>
      <AddNewItem
        toggleButtonText='+ Add another list'
        onAdd={(text) => addList(text)}
      />
    </AppContainer>
  );
};

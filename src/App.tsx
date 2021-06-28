import { useWindowWidth } from '@react-hook/window-size';
import React, { useState } from 'react';
import {
  DragDropContext,
  DragStart,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import { AddNewItem } from './components/AddNewItem';
import { Column } from './components/Column';
import { AppState, useStore } from './state/store';
import { FlexContainer } from './styles';
import { Theme } from './styles/theme';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  background-color: ${Theme.color.primary};
  min-height: 100vh;
  padding: 1.2rem;

  & ${FlexContainer} {
    width: 100%;
    max-width: 300px;
  }

  @media screen and (min-width: 800px) {
    & {
      flex-direction: row;
    }

    & ${FlexContainer} {
      flex: 0 1 300px;
    }
  }
`;

const ListsContainer = styled.div<{ isDraggingOver: boolean }>`
  align-items: flex-start;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? Theme.color.primaryLight : 'transparent'};
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  height: 100%;

  @media screen and (min-width: 400px) {
    & {
      flex-flow: row;
      overflow-x: auto;
    }
  }
`;

const stateSelector = (state: AppState) =>
  [state.lists, state.addList, state.moveList, state.moveTask] as const;

export const App = () => {
  const [lists, addList, moveList, moveTask] = useStore(stateSelector, shallow);
  const [homeIndex, setHomeIndex] = useState<number | null>(null);
  const windowWidth = useWindowWidth();

  const onDragStart = ({ source: { droppableId } }: DragStart) => {
    const homeIndex = lists.findIndex((list) => list.id === droppableId);
    setHomeIndex(homeIndex);
  };

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    setHomeIndex(null);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId === 'board' && destination.droppableId === 'board') {
      moveList(source.index, destination.index);
    } else {
      moveTask(
        source.droppableId,
        source.index,
        destination.droppableId,
        destination.index
      );
    }
  };

  const isDropDisabled = (index: number) => {
    // Prevent moving tasks to previous lists and skipping lists
    return homeIndex !== null
      ? index < homeIndex || index > homeIndex + 1
      : true;
  };

  return (
    <AppContainer>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable
          droppableId='board'
          type='LIST'
          direction={windowWidth >= 400 ? 'horizontal' : 'vertical'}
        >
          {(provided, snapshot) => (
            <ListsContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {lists.map(({ id, text }, index) => (
                <Column
                  key={id}
                  title={text}
                  id={id}
                  index={index}
                  dropDisabled={isDropDisabled(index)}
                />
              ))}
              {provided.placeholder}
            </ListsContainer>
          )}
        </Droppable>
        <FlexContainer direction='column'>
          <AddNewItem
            toggleButtonText='+ Add another list'
            onAdd={(text) => addList(text)}
          />
        </FlexContainer>
      </DragDropContext>
    </AppContainer>
  );
};

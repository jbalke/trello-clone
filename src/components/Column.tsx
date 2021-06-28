import React from 'react';
import { AppState, useStore } from '../state/store';
import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import { Theme } from '../styles/theme';

const ColumnContainer = styled.div<{isDragging: boolean}>`
  background-color: ${Theme.color.grey};
  border-radius: 3px;
  display: flex;
  flex-flow: column nowrap;
  padding: 0.5rem 0.5rem;
  width: 100%;

  ${({isDragging}) => isDragging ? css`outline: 3px solid ${Theme.color.highlight};` : null}

  @media screen and (min-width: 400px) {
    flex: 0 1 300px;
    min-width: 200px;
  }
`;

const ListTitle = styled.div`
  padding: 0.4rem 1rem 0.8rem;
  font-weight: 700;
`;

const TaskList = styled.div<{ isDraggingOver: boolean; dropDisabled: boolean }>`
  flex: 1;
  padding: 5px;

  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? Theme.color.primary : 'transparent'};
  cursor: ${({ dropDisabled }) => (dropDisabled ? 'no-drop' : 'pointer')};
  transition: background-color 200ms ease;
`;

const tasksSelector = (state: AppState) => state.getTasksByListId;
const addTaskToListSelector = (state: AppState) => state.addTaskToList;

type ColumnProps = {
  id: string;
  title: string;
  index: number;
  dropDisabled: boolean;
};

export const Column = ({ title, id, index, dropDisabled }: ColumnProps) => {
  const tasks = useStore(tasksSelector)(id);
  const addTaskToList = useStore(addTaskToListSelector);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <ColumnContainer ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging}>
            <ListTitle {...provided.dragHandleProps}>{title}</ListTitle>
            <Droppable
              droppableId={id}
              type='TASKS'
              isDropDisabled={dropDisabled}
            >
              {(provided, snapshot) => (
                <TaskList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                  dropDisabled={dropDisabled}
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
      )}
    </Draggable>
  );
};

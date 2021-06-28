import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Theme } from '../styles/theme';

const CardContainer = styled.div<{ isDragging: boolean }>`
  background-color: ${({ isDragging }) =>
    isDragging ? Theme.color.primaryLight : Theme.color.white};
  color: ${Theme.color.black};
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: ${Theme.shadow.normal};
`;;
type CardProps = {
  id: string;
  text: string;
  index: number;
};

export function Card({ text, id, index }: CardProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {text}
        </CardContainer>
      )}
    </Draggable>
  );
}

import React from 'react';
import { CardContainer } from '../styles';
import { Draggable } from 'react-beautiful-dnd';

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
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {text}
        </CardContainer>
      )}
    </Draggable>
  );
}

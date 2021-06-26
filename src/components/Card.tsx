import React from 'react';
import { CardContainer } from '../styles';

type CardProps = {
  id: string;
  text: string;
};

export function Card({ text, id }: CardProps) {
  return <CardContainer>{text}</CardContainer>;
}

import React, { useState } from 'react';
import { NewItemButton, NewItemFormContainer, NewItemInput } from '../styles';
import useFocus from '../utils/useFocus';

type NewItemFormProps = {
  onAdd(text: string): void;
};

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState('');
  const inputRef = useFocus();

  // const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     onAdd(text);
  //   }
  // };

  return (
    <NewItemFormContainer onSubmit={(e) => {e.preventDefault(); onAdd(text)}}>
      <NewItemInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        required
      />
      <NewItemButton type="submit">Create</NewItemButton>
    </NewItemFormContainer>
  );
};

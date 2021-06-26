import React, { useState } from 'react';
import { AddItemButton } from '../styles';
import { useClickOutside } from '../utils/useClickOutside';
import { NewItemForm } from './NewItemForm';

type AddNewItemProps = {
  onAdd(text: string): void;
  toggleButtonText: string;
  dark?: boolean;
};

export const AddNewItem = ({
  onAdd,
  toggleButtonText,
  dark,
}: AddNewItemProps) => {
  const [showForm, setShowForm] = useState(false);
  const ref = useClickOutside((e) => {
    setShowForm(false);
  });

  if (showForm) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowForm(false);
        }}
        ref={ref as React.RefObject<HTMLFormElement>}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={(e) => setShowForm(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};

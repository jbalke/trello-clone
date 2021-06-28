import styled from 'styled-components';
import { Theme } from './theme';

export const FlexContainer = styled.div<{
  width?: string;
  direction?: 'row' | 'column';
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : 'row')};
  background-color: transparent;
  width: ${({ width }) => (width ? width : '100%')};
`;

type AddItemButtonProps = {
  dark?: boolean;
};

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${({ dark }) => (dark ? Theme.color.black : Theme.color.white)};
  cursor: pointer;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in();
  width: 100%;

  &:hover {
    background-color: #ffffff52;
  }
`;

export const NewItemFormContainer = styled.form`
  align-items: flex-start;
  display: flex;
  flex-flow: column nowrap;
  max-width: 300px;
  width: 100%;
`;

export const NewItemButton = styled.button`
  background-color: ${Theme.color.highlight};
  border: none;
  border-radius: 3px;
  color: ${Theme.color.white};
  cursor: pointer;
  padding: 6px 12px;
  text-align: center;
`;

export const NewItemInput = styled.input`
  border: none;
  border-radius: 3px;
  box-shadow: ${Theme.shadow.normal};
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  width: 100%;
`;

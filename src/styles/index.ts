import styled from 'styled-components';
import { Theme } from './theme';

export const AppContainer = styled.div`
  align-items: flex-start;
  background-color: ${Theme.color.primary};
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  padding: 1.2rem;
  width: 100%;
`;

export const ColumnContainer = styled.div`
  background-color: ${Theme.color.grey};
  border-radius: 3px;
  flex: 0 1 300px;
  margin-right: 1.2rem;
  min-height: 40px;
  padding: 0.5rem 0.5rem;
`;

export const ColumnTitle = styled.div`
  padding: 0.4rem 1rem 0.8rem;
  font-weight: 700;
`;

export const CardContainer = styled.div`
  background-color: ${Theme.color.white};
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: ${Theme.shadow.normal};
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
  flex: 0 1 300px;
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
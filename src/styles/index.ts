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

export const AppContainer = styled.div`
  background-color: ${Theme.color.primary};
  height: 100%;
  padding: 1.2rem;
`;

export const ListsContainer = styled.div`
  align-items: flex-start;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  min-height: 100vh;
  width: 100%;

  & ${FlexContainer} {
    width: 100%;
  }

  @media screen and (min-width: 400px) {
    & {
      flex-direction: row;
    }

    & ${FlexContainer} {
      width: 300px;
    }
  }
`;

export const ColumnContainer = styled.div`
  background-color: ${Theme.color.grey};
  border-radius: 3px;
  display: flex;
  flex-flow: column nowrap;
  min-height: 100px;
  padding: 0.5rem 0.5rem;
  width: 100%;

  @media screen and (min-width: 400px) {
    flex: 0 1 300px;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0.4rem 1rem 0.8rem;
  font-weight: 700;
`;

export const TaskList = styled.div<{ isDraggingOver: boolean }>`
  flex: 1;
  padding: 5px;

  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? Theme.color.primary : 'transparent'};
  transition: background-color 200ms ease;
`;

export const CardContainer = styled.div<{ isDragging: boolean }>`
  background-color: ${({ isDragging }) =>
    isDragging ? Theme.color.primaryLight : Theme.color.white};
  color: ${Theme.color.black};
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

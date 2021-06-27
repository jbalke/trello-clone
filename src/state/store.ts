import produce from 'immer';
import { nanoid } from 'nanoid';
import pipe from 'ramda/es/pipe';
import create, { StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { findItemIndexById } from '../utils/arrayUtils';

export type Task = {
  id: string;
  text: string;
};

export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

export type AppState = {
  lists: List[];
  getTasksByListId(id: string): Task[];
  addTaskToList(text: string, listId: string): void;
  addList(title: string): void;
  moveList(fromIndex: number, toIndex: number): void;
  moveTask(
    sourceListId: string,
    sourceListIndex: number,
    destinationListId: string,
    destinationListIndex: number
  ): void;
};

const enableDevTools = <T extends AppState>(
  config: StateCreator<T>
): StateCreator<T> =>
  devtools((set, get, api) => config(set, get, api), 'MyStore');

const persistToLocalStorage = <T extends AppState>(
  config: StateCreator<T>
): StateCreator<T> =>
  persist((set, get, api) => config(set, get, api), {
    name: 'trello-clone-storage',
  });

const immer =
  <T extends AppState>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) =>
    config(
      (partial, replace) => {
        const nextState =
          typeof partial === 'function'
            ? produce(partial as (state: T) => T)
            : (partial as T);
        return set(nextState, replace);
      },
      get,
      api
    );

const createStore = pipe(immer, persistToLocalStorage, enableDevTools, create);

export const useStore = createStore<AppState>((set, get) => ({
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c1', text: 'Learn TypeScript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c2', text: 'Begin to use static typing' }],
    },
  ],
  getTasksByListId(id: string) {
    return get().lists.find((list) => list.id === id)?.tasks ?? [];
  },
  addTaskToList(text, id) {
    set((state) => {
      const listId = findItemIndexById(state.lists, id);
      if (listId !== -1) {
        state.lists[listId].tasks.push({ id: nanoid(), text });
      }
    });
  },
  addList(text: string) {
    set((state) => void state.lists.push({ id: nanoid(), text, tasks: [] }));
  },
  moveList(fromIndex: number, toIndex: number) {
    set((state) => {
      const list = state.lists.splice(fromIndex, 1)[0];
      state.lists.splice(toIndex, 0, list);
    });
  },
  moveTask(
    sourceListId: string,
    sourceItemIndex: number,
    destinationListId: string,
    destinationItemIndex: number
  ) {
    set((state) => {
      const sourceListIndex = findItemIndexById(state.lists, sourceListId);
      const task = state.lists[sourceListIndex].tasks.splice(
        sourceItemIndex,
        1
      )[0];

      const destinationListIndex = findItemIndexById(
        state.lists,
        destinationListId
      );
      state.lists[destinationListIndex].tasks.splice(
        destinationItemIndex,
        0,
        task
      );
    });
  },
}));

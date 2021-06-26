import { nanoid } from 'nanoid';
import create from 'zustand';

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
};

export const useStore = create<AppState>((set, get) => ({
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
  getTasksByListId(id) {
    return get().lists.find((list) => list.id === id)?.tasks ?? [];
  },
  addTaskToList(text, id) {
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === id
          ? { ...list, tasks: [...list.tasks, { id: nanoid(), text }] }
          : list
      ),
    }));
  },
  addList(text) {
    set((state) => ({
      lists: [...state.lists, { id: nanoid(), text, tasks: [] }],
    }));
  },
}));

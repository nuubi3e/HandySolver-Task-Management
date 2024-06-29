import { createContext } from 'react';
import { NewTask, Task } from '../../types';

type TaskContext = {
  tasks: Task[];
  loading: boolean;
  addNewTask: (task: NewTask) => Promise<boolean | void>;
  updateTask: (task: Task) => Promise<boolean | void>;
  deleteTask: (id: string) => Promise<boolean | void>;
};

export const TaskContext = createContext<TaskContext>({
  tasks: [],
  addNewTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  loading: false,
});

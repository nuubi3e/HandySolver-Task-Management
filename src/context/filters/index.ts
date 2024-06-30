import { createContext } from 'react';
import { FilterObj, Filters, TaskWithSerialNo } from '../../types';

type FilterContext = {
  taskPerPage: number;
  currentPage: number;
  totalPages: number;
  allDragging: boolean;
  filters: FilterObj;
  filteredTasks: TaskWithSerialNo[];
  changePage: (type: 'forward' | 'backward' | number) => void;
  changeTaskPerPage: (taskPerPage: number) => void;
  setFilteredTasks: React.Dispatch<React.SetStateAction<TaskWithSerialNo[]>>;
  addFilters: (type: Filters, value: string) => void;
  setIsDragging: (isDragging: boolean, id?: string) => void;
  clearFilters: () => void;
};

export const FilterContext = createContext<FilterContext>({
  taskPerPage: 5,
  allDragging: false,
  currentPage: 1,
  totalPages: 1,
  filteredTasks: [],
  filters: {
    title: '',
    status: '',
    assignedTo: '',
    dueDate: '',
    estimatedHours: '',
    priority: '',
    createdOn: '',
    taskId: '',
    isAssigned: '',
  },
  changeTaskPerPage: () => {},
  changePage: () => {},
  setFilteredTasks: () => {},
  addFilters: () => {},
  setIsDragging: () => {},
  clearFilters: () => {},
});

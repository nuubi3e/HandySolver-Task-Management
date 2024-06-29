import { createContext } from 'react';
import { FilterObj, Filters, TaskWithSerialNo } from '../../types';

type FilterContext = {
  taskPerPage: number;
  currentPage: number;
  hasActiveFilters: boolean;
  totalPages: number;
  filteredTasks: TaskWithSerialNo[];
  changePage: (type: 'forward' | 'backward') => void;
  changeTaskPerPage: (taskPerPage: number) => void;
  setFilteredTasks: React.Dispatch<React.SetStateAction<TaskWithSerialNo[]>>;
  filters: FilterObj;
  applyFilters: (type: Filters, value: string) => void;
  toogleIsDragging: (id?: string) => void;
};

export const FilterContext = createContext<FilterContext>({
  taskPerPage: 5,
  currentPage: 1,
  hasActiveFilters: false,
  changePage: () => {},
  changeTaskPerPage: () => {},
  totalPages: 1,
  filteredTasks: [],
  setFilteredTasks: () => {},
  filters: {
    title: '',
    status: '',
    assignedTo: '',
    dueDate: '',
    estimatedHours: '',
    priority: '',
    createdOn: '',
    taskId: '',
  },
  applyFilters: () => {},
  toogleIsDragging: () => {},
});

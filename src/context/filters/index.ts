import { createContext } from 'react';
import { FilterObj, Filters, TaskWithSerialNo } from '../../types';

type FilterContext = {
  taskPerPage: number;
  currentPage: number;
  totalPages: number;
  filteredTasks: TaskWithSerialNo[];
  changePage: (type: 'forward' | 'backward') => void;
  changeTaskPerPage: (taskPerPage: number) => void;
  setFilteredTasks: React.Dispatch<React.SetStateAction<TaskWithSerialNo[]>>;
  filters: FilterObj;
  addFilters: (type: Filters, value: string) => void;
  setIsDragging: (isDragging: boolean, id?: string) => void;
  clearFilters: () => void;
};

export const FilterContext = createContext<FilterContext>({
  taskPerPage: 5,
  currentPage: 1,
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
    isAssigned: '',
  },
  addFilters: () => {},
  setIsDragging: () => {},
  clearFilters: () => {},
});

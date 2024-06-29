/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { TaskContext } from '../tasks';
import { FilterContext } from '.';
import { FilterObj, Filters, Task, TaskWithSerialNo } from '../../types';

export const FiltersProvider = ({ children }: PropsWithChildren) => {
  const { tasks } = useContext(TaskContext);
  const [taskPerPage, setTaskPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasActiveFilters] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<TaskWithSerialNo[]>([]);
  const [extraFilteredTasks, setExtraFilteredTasks] = useState<Task[]>(tasks);
  const [filters, setFilters] = useState<FilterObj>({
    title: '',
    status: '',
    assignedTo: '',
    dueDate: '',
    estimatedHours: '',
    priority: '',
    createdOn: '',
    taskId: '',
  });

  const addPagniation = useCallback(
    (tasks: Task[]) => {
      setTotalPages(Math.ceil(tasks.length / taskPerPage));

      const startIndex = (currentPage - 1) * taskPerPage;
      const endIndex = startIndex + taskPerPage;

      setFilteredTasks(
        tasks.slice(startIndex, endIndex).map((task, i) => ({
          ...task,
          serialNo: startIndex + i + 1,
          isDraggable: false,
        }))
      );
    },
    [currentPage, taskPerPage]
  );

  const changeTaskPerPage = (n: number) => setTaskPerPage(n);

  const changePage = (type: 'forward' | 'backward') => {
    setCurrentPage((page) => {
      switch (type) {
        case 'backward':
          return page - 1;

        case 'forward':
          return page + 1;

        default:
          return page;
      }
    });
  };

  const applyFilters = (type: Filters, value: string) => {
    setFilters((lst) => {
      return { ...lst, [type]: value };
    });

    const filteredTasks = tasks.filter((t) => {
      if (!value) return t;

      switch (type) {
        case 'title':
          return t.title.toLowerCase().includes(value.toLowerCase());

        case 'taskId':
          return t.id.toLowerCase().includes(value);

        case 'status':
          return t.status === value;

        case 'assignedTo':
          return t.assignedTo === value;

        case 'dueDate':
          return t.dueDate === value;

        case 'estimatedHours':
          return t.estimatedHours === value;

        case 'priority':
          return t.priority === value;

        case 'createdOn':
          return t.createdOn === value;
      }
    });

    addPagniation(filteredTasks);
  };

  const toogleIsDragging = (id?: string) => {
    setFilteredTasks((lst) => {
      const lastTask = [...lst];

      const index = lastTask.findIndex((t) => t.id === id);

      if (index === -1)
        lastTask.forEach((task) => {
          task['isDraggable'] = !task['isDraggable'];
        });
      else {
        lastTask[index]['isDraggable'] = !lastTask[index]['isDraggable'];
      }

      return lastTask;
    });
  };

  // Updating total pages whenever tasks ot taskperpage changes
  useEffect(() => {
    addPagniation(tasks);
  }, [tasks, taskPerPage, currentPage, addPagniation]);

  useEffect(() => {
    setExtraFilteredTasks(tasks);
  }, [tasks]);

  return (
    <FilterContext.Provider
      value={{
        changePage,
        changeTaskPerPage,
        currentPage,
        taskPerPage,
        totalPages,
        hasActiveFilters,
        filteredTasks,
        setFilteredTasks,
        filters,
        applyFilters,
        toogleIsDragging,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

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
  const [allDragging, setAllDragging] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<TaskWithSerialNo[]>([]);
  const [filters, setFilters] = useState<FilterObj>({
    title: '',
    status: '',
    assignedTo: '',
    dueDate: '',
    estimatedHours: '',
    priority: '',
    createdOn: '',
    taskId: '',
    isAssigned: '',
  });

  const addPagniation = useCallback(
    (tasks: Task[]) => {
      setTotalPages(Math.ceil(tasks.length / taskPerPage));

      const startIndex = (currentPage - 1) * taskPerPage;
      const endIndex = startIndex + taskPerPage;

      const paginatedTasks = tasks
        .slice(startIndex, endIndex)
        .map((task, i) => ({
          ...task,
          serialNo: startIndex + i + 1,
          isDraggable: false,
        }));

      console.log('PAGINATED TASKS: ', paginatedTasks);

      setFilteredTasks(paginatedTasks);
    },
    [currentPage, taskPerPage]
  );

  const changeTaskPerPage = (n: number) => {
    setCurrentPage(1);
    setTaskPerPage(n);
  };

  // function to change page
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

  // Function to add filters values
  const addFilters = (type: Filters, value: string) => {
    setCurrentPage(1); // set current page to 1 to avoid wierd filtering bug
    setFilters((lst) => {
      return { ...lst, [type]: value };
    });
  };

  // Function to change dragging ability of task cell
  const setIsDragging = (isDragging: boolean, id?: string) => {
    setFilteredTasks((lst) => {
      const alltasks = [...lst];

      const index = alltasks.findIndex((t) => t.id === id);

      if (index === -1)
        alltasks.forEach((task) => {
          task['isDraggable'] = isDragging;
        });
      else {
        alltasks[index]['isDraggable'] = isDragging;
      }

      return alltasks;
    });

    if (id) return;

    setAllDragging(isDragging);
  };

  // Updating total pages whenever tasks ot taskperpage changes
  useEffect(() => {
    addPagniation(tasks);
  }, [tasks, addPagniation]);

  // Below effect will be applied whenever filters object changes
  useEffect(() => {
    let filteredTasks: Task[] = tasks;

    for (const key in filters) {
      const value = filters[key as Filters];

      filteredTasks = filteredTasks.filter((t) => {
        if (!value) return t;

        switch (key) {
          case 'title':
            return t.title
              .toLowerCase()
              .match(new RegExp(value.toLowerCase(), 'g'));

          case 'taskId':
            return t.id.match(new RegExp(value, 'g'));

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
            return t.createdOn === new Date(value).toDateString();

          case 'isAssigned':
            return t.isAssigned.toString() === value;
        }
      });
    }

    addPagniation(filteredTasks);
  }, [filters, addPagniation, tasks]);

  // function to clear all filters
  const clearFilters = () => {
    setFilters({
      title: '',
      status: '',
      assignedTo: '',
      dueDate: '',
      estimatedHours: '',
      priority: '',
      createdOn: '',
      taskId: '',
      isAssigned: '',
    });
    addPagniation(tasks);
    setAllDragging(false);
  };

  return (
    <FilterContext.Provider
      value={{
        changePage,
        changeTaskPerPage,
        currentPage,
        taskPerPage,
        totalPages,
        filteredTasks,
        setFilteredTasks,
        filters,
        addFilters,
        setIsDragging,
        clearFilters,
        allDragging,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

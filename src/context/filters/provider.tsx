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

  const addFilters = (type: Filters, value: string) =>
    setFilters((lst) => {
      return { ...lst, [type]: value };
    });

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
        toogleIsDragging,
        clearFilters,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

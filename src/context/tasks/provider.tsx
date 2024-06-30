/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropsWithChildren, useEffect, useState } from 'react';
import { TaskContext } from '.';
import { NewTask, Task } from '../../types';
import { API } from '../../lib/api';
import toast from 'react-hot-toast';

export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const updateTask = async (task: Task) => {
    const res = await new API(`tasks/${task.id}`).connect({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
      }),
    });

    if (!res.success) return false;

    fetchAllTasks();

    toast.success(`${task.title} Task Updated Successfully`);
  };

  const addNewTask = async (task: NewTask) => {
    const res = await new API(`tasks`).connect({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        createdOn: new Date().toDateString(),
      }),
    });

    if (!res.success) return false;

    setTasks((lst) => {
      const prevTask = [...lst];

      prevTask.push(res.data as Task);

      return prevTask;
    });

    toast.success(`New Task Addded Successfully`);
  };

  const deleteTask = async (id: string) => {
    const res = await new API(`tasks/${id}`).connect({
      method: 'DELETE',
    });

    if (!res.success) return false;

    setTasks((lst) => {
      const prevTask = [...lst];

      const index = prevTask.findIndex((task) => task.id === id);

      if (index !== -1) {
        prevTask.splice(index, 1);
      }

      return prevTask;
    });

    toast.success(`Task Deleted Successfully`);
  };

  const fetchAllTasks = async () => {
    setLoading(true);
    const res = await new API('tasks').connect({ method: 'GET' });

    setTasks((res?.data as Task[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addNewTask,
        deleteTask,
        updateTask,
        loading,
      }}>
      {children}
    </TaskContext.Provider>
  );
};

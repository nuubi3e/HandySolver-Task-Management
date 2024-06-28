import { NewTaskButton } from '../components/NewTaskButton';
import { TaskTable } from '../components/TaskTable';

export const App = () => {
  return (
    <main>
      <h1 className='text-center font-semibold text-4xl my-8 uppercase'>
        Task Management Table
      </h1>

      <section className='w-[80dvw] mx-auto flex flex-col gap-8'>
        <NewTaskButton />
        <TaskTable />
      </section>
    </main>
  );
};

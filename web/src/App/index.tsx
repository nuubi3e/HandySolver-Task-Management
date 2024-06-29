import { NewTaskButton } from '../components/NewTaskButton';
import { Pagination } from '../components/Pagination';
import { TaskTable } from '../components/TaskTable';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <>
      <Toaster />
      <main>
        <h1 className='text-center font-semibold text-4xl my-8 uppercase'>
          Task Management Table
        </h1>

        <section className='w-[90dvw] mx-auto flex flex-col gap-8'>
          <NewTaskButton />
          <TaskTable />
          <Pagination />
        </section>
      </main>
    </>
  );
};

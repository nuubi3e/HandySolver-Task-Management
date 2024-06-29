import { NewTaskButton } from '../components/NewTaskButton';
import { Pagination } from '../components/Pagination';
import { TaskPerPage } from '../components/TaskPerPage';
import { TaskTable } from '../components/TaskTable';
import { Toaster } from 'react-hot-toast';

export const App = () => {
  return (
    <>
      <Toaster />
      <main className='py-8'>
        <h1 className='text-center font-semibold text-4xl mb-8 uppercase'>
          Task Management Table
        </h1>

        <section className='w-[90dvw] mx-auto flex flex-col gap-8'>
          <div className='flex justify-between'>
            <TaskPerPage />
            <NewTaskButton />
          </div>
          <TaskTable />
          <Pagination />
        </section>
      </main>
    </>
  );
};

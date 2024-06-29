import { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { FilterContext } from '../../context/filters';
import { TaskContext } from '../../context/tasks';

export const Pagination = () => {
  const { totalPages, currentPage, changePage, filteredTasks, taskPerPage } =
    useContext(FilterContext);
  const { tasks } = useContext(TaskContext);

  const totalTasks = tasks.length;
  const visibleTasks = filteredTasks.length;

  // return if no task present
  if (totalTasks === 0) return <></>;

  return (
    <div className='w-full flex justify-between'>
      <div className='flex gap-2 font-medium'>
        {currentPage > 1 && (
          <button
            type='button'
            onClick={() => changePage('backward')}
            className='uppercase rounded-md border-[#ffa629] border-2 bg-[#fff2df] px-1 py-2 text-xl hover:bg-primary'>
            <IoIosArrowBack />
          </button>
        )}

        {/* show when tasks is greater than taskPerPage */}
        {totalTasks > taskPerPage && (
          <p className='rounded-md self-stretch flex items-center px-3 py-2 bg-primary'>
            {currentPage}
          </p>
        )}

        {currentPage < totalPages && (
          <button
            type='button'
            onClick={() => changePage('forward')}
            className='uppercase rounded-md border-[#ffa629] border-2 bg-[#fff2df] px-1 py-2 text-xl hover:bg-primary rotate-180'>
            <IoIosArrowBack />
          </button>
        )}
      </div>
      <p className='self-center  text-sm font-semibold'>
        Showing {visibleTasks} task's out of {totalTasks}
      </p>
    </div>
  );
};

import { useContext } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { FilterContext } from '../../context/filters';

export const Pagination = () => {
  const { totalPages, currentPage, changePage } = useContext(FilterContext);

  // if tasks is less than data per page then we render empty fragment
  // if (tasks.length <= dataPerPage) return <></>;

  return (
    <div className='flex gap-2 font-medium'>
      {currentPage > 1 && (
        <button
          type='button'
          onClick={() => changePage('backward')}
          className='uppercase rounded-md border-[#ffa629] border-2 bg-[#fff2df] px-1 py-2 text-xl hover:bg-primary'>
          <IoIosArrowBack />
        </button>
      )}

      <p className='rounded-md self-stretch flex items-center px-3 py-2 bg-primary'>
        {currentPage}
      </p>

      {currentPage < totalPages && (
        <button
          type='button'
          onClick={() => changePage('forward')}
          className='uppercase rounded-md border-[#ffa629] border-2 bg-[#fff2df] px-1 py-2 text-xl hover:bg-primary rotate-180'>
          <IoIosArrowBack />
        </button>
      )}
    </div>
  );
};

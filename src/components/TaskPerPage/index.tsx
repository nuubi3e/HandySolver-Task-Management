import { useContext } from 'react';
import { FilterContext } from '../../context/filters';

export const TaskPerPage = () => {
  const { taskPerPage, changeTaskPerPage } = useContext(FilterContext);

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='taskPerPage' className='text-sm font-medium'>
        Task / Pages
      </label>
      <select
        name='taskPerPage'
        id='taskPerPage'
        onChange={(e) => changeTaskPerPage(+e.target.value)}
        value={taskPerPage}
        className='px-2 py-1 bg-white'>
        <option value='5'>5</option>
        <option value='10'>10</option>
      </select>
    </div>
  );
};

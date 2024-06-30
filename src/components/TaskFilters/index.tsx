import { useContext } from 'react';
import { members, priorities, statues } from '../../lib/utility';
import { FilterContext } from '../../context/filters';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { PiDotsSixVerticalBold, PiDotsSixVerticalFill } from 'react-icons/pi';

export const TaskFilters = () => {
  const { addFilters, filters, clearFilters, setIsDragging, allDragging } =
    useContext(FilterContext);

  return (
    <tr>
      <th className='text-center'>
        <button
          type='button'
          className='text-xl'
          onClick={() => setIsDragging(!allDragging)}>
          {allDragging ? <PiDotsSixVerticalFill /> : <PiDotsSixVerticalBold />}
        </button>
      </th>
      <th>
        <MdOutlineFilterAlt className='text-2xl mx-auto' />
      </th>
      <th>
        <input
          type='search'
          name='title'
          id='title'
          value={filters.title}
          placeholder='Search Title'
          className='text-center'
          onChange={(e) => addFilters('title', e.target.value)}
        />
      </th>
      <th>
        <input
          type='search'
          name='taskId'
          id='taskId'
          value={filters.taskId}
          placeholder='Search Task Id'
          className='text-center'
          onChange={(e) => addFilters('taskId', e.target.value)}
        />
      </th>
      <th>
        <select
          id='status'
          className='capitalize text-center'
          value={filters.status}
          onChange={(e) => addFilters('status', e.target.value)}>
          <option value=''>All</option>
          {statues.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </th>
      <th>
        <select
          id='assignedTo'
          className='capitalize text-center'
          value={filters.assignedTo}
          onChange={(e) => addFilters('assignedTo', e.target.value)}>
          <option value=''>All</option>
          {members.map((member) => (
            <option key={member} value={member}>
              Member {member}
            </option>
          ))}
        </select>
      </th>
      <th>
        <input
          type='date'
          className='text-center'
          name='dueDateFilter'
          id='dueDateFilter'
          value={filters.dueDate}
          onChange={(e) => addFilters('dueDate', e.target.value)}
        />
      </th>
      <th>
        <select
          id='isAssigned'
          className='capitalize text-center'
          value={filters.isAssigned}
          onChange={(e) => addFilters('isAssigned', e.target.value)}>
          <option value=''>All</option>
          <option value={'true'}>Yes</option>
          <option value={'false'}>No</option>
        </select>
      </th>
      <th>
        <input
          type='time'
          className='text-center'
          name='estimatedHrs'
          id='estimatedHrs'
          value={filters.estimatedHours}
          onChange={(e) => addFilters('estimatedHours', e.target.value)}
        />
      </th>
      <th>
        <select
          id='priority'
          className='capitalize text-center'
          value={filters.priority}
          onChange={(e) => addFilters('priority', e.target.value)}>
          <option value=''>All</option>
          {priorities.map((prio) => (
            <option key={prio} value={prio}>
              {prio}
            </option>
          ))}
        </select>
      </th>
      <th>
        <input
          type='date'
          className='text-center'
          name='createdDateFilter'
          id='createdDateFilter'
          value={filters.createdOn}
          onChange={(e) => addFilters('createdOn', e.target.value)}
        />
      </th>
      <th>
        <button
          type='button'
          onClick={clearFilters}
          className='text-sm px-3 uppercase bg-teal-500 text-teal-50 py-1 rounded-md transition-all hover:bg-teal-600'>
          clear
        </button>
      </th>
    </tr>
  );
};

import { useContext } from 'react';
import { members, priorities, statues } from '../../lib/utility';
import { FilterContext } from '../../context/filters';
import { MdOutlineFilterAlt } from 'react-icons/md';

export const TaskFilters = () => {
  const { addFilters, filters, clearFilters } = useContext(FilterContext);

  console.log(filters);

  return (
    <tr>
      <th className='text-center'>
        <MdOutlineFilterAlt className='text-2xl mx-auto' />
      </th>
      <th></th>
      <th>
        <input
          type='search'
          name='title'
          id='title'
          value={filters.title}
          onChange={(e) => addFilters('title', e.target.value)}
        />
      </th>
      <th>
        <input
          type='search'
          name='taskId'
          id='taskId'
          value={filters.taskId}
          onChange={(e) => addFilters('taskId', e.target.value)}
        />
      </th>
      <th>
        <select
          id='status'
          className='capitalize'
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
          className='capitalize'
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
          name='dueDateFilter'
          id='dueDateFilter'
          value={filters.dueDate}
          onChange={(e) => addFilters('dueDate', e.target.value)}
        />
      </th>
      <th>
        <select
          id='isAssigned'
          className='capitalize'
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
          name='estimatedHrs'
          id='estimatedHrs'
          value={filters.estimatedHours}
          onChange={(e) => addFilters('estimatedHours', e.target.value)}
        />
      </th>
      <th>
        <select
          id='priority'
          className='capitalize'
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
          name='createdDateFilter'
          id='createdDateFilter'
          value={filters.createdOn}
          onChange={(e) => addFilters('createdOn', e.target.value)}
        />
      </th>
      <th>
        <input
          type='button'
          onClick={clearFilters}
          className='text-sm px-3 uppercase'
          value={'clear'}
        />
      </th>
    </tr>
  );
};

import { useContext } from 'react';
import { members, priorities, statues } from '../../lib/utility';
import { FilterContext } from '../../context/filters';

export const TaskFilters = () => {
  const { applyFilters, filters } = useContext(FilterContext);

  console.log(filters);

  return (
    <tr>
      <th>Filters</th>
      <th></th>
      <th>
        <input
          type='search'
          name='title'
          id='title'
          onChange={(e) => applyFilters('title', e.target.value)}
        />
      </th>
      <th>
        <input
          type='search'
          name='taskId'
          id='taskId'
          onChange={(e) => applyFilters('taskId', e.target.value)}
        />
      </th>
      <th>
        <select
          id='status'
          className='capitalize'
          onChange={(e) => applyFilters('status', e.target.value)}>
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
          onChange={(e) => applyFilters('assignedTo', e.target.value)}>
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
          onChange={(e) => applyFilters('dueDate', e.target.value)}
        />
      </th>
      <th></th>
      <th>
        <input
          type='time'
          name='estimatedHrs'
          id='estimatedHrs'
          onChange={(e) => applyFilters('estimatedHours', e.target.value)}
        />
      </th>
      <th>
        <select
          id='priority'
          className='capitalize'
          onChange={(e) => applyFilters('priority', e.target.value)}>
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
          onChange={(e) => applyFilters('createdOn', e.target.value)}
        />
      </th>
      <th></th>
    </tr>
  );
};

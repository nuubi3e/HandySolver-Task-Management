import { useContext } from 'react';
import { TaskContext } from '../../context/tasks';
import { Reorder } from 'framer-motion';
import { FilterContext } from '../../context/filters';
import { dateConverter, timeConverter } from '../../lib/utility';
import { DeleteButton, EditButton } from '../Buttons';
import { TaskFilters } from '../TaskFilters';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { PiDotsSixVerticalFill } from 'react-icons/pi';
import { LuClipboard } from 'react-icons/lu';
import toast from 'react-hot-toast';

export const TaskTable = () => {
  const { filteredTasks, setFilteredTasks, setIsDragging } =
    useContext(FilterContext);
  const { loading } = useContext(TaskContext);

  return (
    <div className='task-table'>
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Serial No</th>
            <th>Task Title</th>
            <th>Task ID</th>
            <th>Status</th>
            <th>Assigned Members</th>
            <th>Due Date</th>
            <th>Is Assigned</th>
            <th>Estimated Hours</th>
            <th>Priority</th>
            <th>Created On</th>
            <th>Actions</th>
          </tr>
          <TaskFilters />
        </thead>
        <Reorder.Group
          as='tbody'
          axis='y'
          values={filteredTasks}
          onReorder={setFilteredTasks}>
          {!loading && filteredTasks.length === 0 && (
            <tr>
              <td colSpan={12} className='font-semibold'>
                No Tasks Found!!
              </td>
            </tr>
          )}

          {loading && (
            <tr>
              <td colSpan={12} className='font-semibold'>
                Loading...
              </td>
            </tr>
          )}

          {!loading &&
            filteredTasks.map((task) => (
              <Reorder.Item
                as='tr'
                value={task}
                className='select-none'
                key={task.id}
                dragListener={task.isDraggable}>
                <td>
                  <button
                    type='button'
                    className='text-xl'
                    onClick={() => setIsDragging(!task.isDraggable, task.id)}>
                    {task.isDraggable ? (
                      <PiDotsSixVerticalFill />
                    ) : (
                      <PiDotsSixVerticalBold />
                    )}
                  </button>
                </td>
                <td>{task.serialNo}</td>
                <td>{task.title}</td>
                <td>
                  <div className='flex items-center gap-2 justify-center'>
                    {task.id}
                    <button
                      type='button'
                      onClick={() => {
                        navigator.clipboard.writeText(task.id);

                        toast.success(
                          `Task Id: ${task.id} Copied Successfully`
                        );
                      }}
                      className='outline-none'>
                      <LuClipboard />
                    </button>
                  </div>
                </td>
                <td
                  style={{
                    textWrap: 'nowrap',
                  }}>
                  <span className={`label label--${task.status}`}>
                    {task.status.replace('-', ' ')}
                  </span>
                </td>
                <td>
                  <span className={`label label--${task.assignedTo}`}>
                    Team Member {task.assignedTo}
                  </span>
                </td>
                <td>{dateConverter(task.dueDate)}</td>
                <td>
                  <span className={`label label--${task.isAssigned}`}>
                    {task.isAssigned ? 'Yes' : 'No'}
                  </span>
                </td>
                <td>{timeConverter(task.estimatedHours)}</td>
                <td>
                  {' '}
                  <span className={`label label--${task.priority}`}>
                    {task.priority}
                  </span>
                </td>
                <td>{dateConverter(task.createdOn)}</td>
                <td>
                  <div className='flex items-center gap-2 justify-center'>
                    <EditButton {...task} />
                    <DeleteButton id={task.id} />
                  </div>
                </td>
              </Reorder.Item>
            ))}
        </Reorder.Group>
      </table>
    </div>
  );
};

/**
 * <Reorder.Item as='tr' value={task} key={task.id}>
                <td></td>
                <td>{startIndex + i + 1}</td>
                <td>{task.title}</td>
                <td>{task.id}</td>
                <td>{task.status}</td>
                <td>{task.assignedTo}</td>
                <td>{dateConverter(task.dueDate)}</td>
                <td>{task.isAssigned ? 'Yes' : 'No'}</td>
                <td>{timeConverter(task.estimatedHours)}</td>
                <td>{task.priority}</td>
                <td>{dateConverter(task.createdOn)}</td>
                <td>
                  <div className='flex items-center gap-2 justify-center'>
                    <EditButton {...task} />
                    <DeleteButton id={task.id} />
                  </div>
                </td>
              </Reorder.Item>
 */

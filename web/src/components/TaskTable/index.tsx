import { FiEdit2 } from 'react-icons/fi';
import { FiTrash } from 'react-icons/fi';

export const TaskTable = () => {
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
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div className='flex items-center gap-2 justify-center'>
                <button
                  type='button'
                  className='text-xl transition-all hover:scale-110 focus:scale-100'>
                  <FiEdit2 />
                </button>
                <button
                  type='button'
                  className='text-xl transition-all hover:scale-110 focus:scale-100'>
                  <FiTrash />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

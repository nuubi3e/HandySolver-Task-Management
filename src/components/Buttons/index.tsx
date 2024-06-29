import { useContext, useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { TaskForm } from '../TaskForm';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import { Task } from '../../types';
import { TaskContext } from '../../context/tasks';
import { ConfirmModal } from '../ConfirmModal';

export const NewTaskButton = () => {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const toggleModal = (type: 'open' | 'close') =>
    setShowNewTaskForm(type === 'open');

  return (
    <>
      <button
        type='button'
        onClick={() => toggleModal('open')}
        className='border-[#ffa629] border-2 rounded-md px-3 py-2 flex items-center gap-3 bg-[#fff2df] text-black self-end uppercase font-bold transition-all hover:shadow-md hover:translate-y-[-2%] active:translate-y-0 active:shadow-sm'>
        Create new Task
        <span className='inline-block bg-white text-2xl border-[2px] text-black border-black'>
          <TiPlus />
        </span>
      </button>

      {showNewTaskForm && (
        <TaskForm onClose={() => toggleModal('close')} mode='add' />
      )}
    </>
  );
};

export const EditButton = (task: Task) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const toggleModal = (type: 'open' | 'close') =>
    setShowEditForm(type === 'open');
  return (
    <>
      <button
        type='button'
        onClick={() => toggleModal('open')}
        className='text-xl transition-all hover:scale-110 focus:scale-100'>
        <FiEdit2 />
      </button>

      {showEditForm && (
        <TaskForm onClose={() => toggleModal('close')} mode='edit' {...task} />
      )}
    </>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const { deleteTask } = useContext(TaskContext);
  const [deleting, setDeleting] = useState(false);

  const toggleModal = (type: 'open' | 'close') =>
    setShowConfirmPopup(type === 'open');

  return (
    <>
      <button
        type='button'
        onClick={() => toggleModal('open')}
        className='text-xl transition-all hover:scale-110 focus:scale-100'>
        <FiTrash />
      </button>

      {showConfirmPopup && (
        <ConfirmModal
          submitting={deleting}
          onClose={() => toggleModal('close')}
          onSuccess={async () => {
            setDeleting(true);
            await deleteTask(id);
            setDeleting(false);
            toggleModal('close');
          }}
        />
      )}
    </>
  );
};

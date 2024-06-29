import { useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { TaskForm } from '../TaskForm';

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

import { FC, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BiX } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { Members, NewTask, Priority, Status } from '../../types';
import { ErrorMessage } from '@hookform/error-message';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import { LuLoader } from 'react-icons/lu';
import { TaskContext } from '../../context/tasks';
import { members, priorities, statues } from '../../lib/utility';

type Props = {
  onClose: () => void;
  mode: keyof typeof Modes;
  id?: string;
  title?: string;
  status?: Status;
  assignedTo?: Members;
  dueDate?: string;
  isAssigned?: boolean;
  estimatedHours?: string;
  priority?: Priority;
  createdOn?: string;
};

const Modes = {
  add: 'New Task',
  edit: 'Edit Task',
};

export const TaskForm: FC<Props> = ({ onClose, mode, id, ...task }) => {
  const [submitting, setSubmitting] = useState(false);
  const { addNewTask, updateTask } = useContext(TaskContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTask>({ defaultValues: { ...task } });

  const formSubmitHandler = async (userData: NewTask) => {
    setSubmitting(true);

    // if mode is add then add new task else update
    await (mode === 'add'
      ? addNewTask(userData)
      : updateTask({ ...userData, id: id || '' }));

    onClose();
    setSubmitting(false);
  };

  useEffect(() => {
    // Disabling scrolling on body when popup gets mounted
    document.body.style.overflow = 'hidden';

    return () => {
      // enabling scrolling on body when popup gets unmounted
      document.body.style.overflow = 'auto';
    };
  });

  return createPortal(
    <div className='fixed top-0 left-0 w-[100dvw] py-10 h-[100dvh] z-[999] bg-black bg-opacity-20 backdrop-blur-sm overflow-y-auto'>
      <div className='w-[60%] mx-auto bg-white py-6 px-6 relative rounded-xl shadow-md'>
        <button
          type='button'
          onClick={onClose}
          disabled={submitting}
          className='absolute top-3 right-3 text-4xl disabled:cursor-not-allowed'>
          <BiX />
        </button>

        <h2 className='text-3xl font-bold'>
          {Modes[mode]} {task?.title && `(${task.title})`}
        </h2>

        <form
          className='task-form'
          noValidate
          onSubmit={handleSubmit(formSubmitHandler)}>
          <div>
            <label htmlFor='title'>Title</label>
            <input
              type='text'
              {...register('title', { required: 'Title is Required' })}
              id='title'
              placeholder='Task Title'
            />
            <ErrorMessage
              errors={errors}
              name='title'
              render={({ message }) => (
                <p className='text-red-500 text-sm'>{message}</p>
              )}
            />
          </div>

          <div>
            <label htmlFor='dueDate'>Due Date</label>
            <input
              type='date'
              {...register('dueDate', { required: 'Due Date is Required' })}
              id='dueDate'
            />
            <ErrorMessage
              errors={errors}
              name='dueDate'
              render={({ message }) => (
                <p className='text-red-500 text-sm'>{message}</p>
              )}
            />
          </div>

          <div>
            <label htmlFor='estimatedHours'>Estimated Hours</label>
            <input
              type='time'
              {...register('estimatedHours', {
                required: 'Estimated Hours is Required',
              })}
              id='estimatedHours'
            />
            <ErrorMessage
              errors={errors}
              name='estimatedHours'
              render={({ message }) => (
                <p className='text-red-500 text-sm'>{message}</p>
              )}
            />
          </div>

          <div>
            <label htmlFor='status'>Status</label>
            <select
              {...register('status', {
                required: 'Status is Required',
              })}
              id='status'
              className='capitalize'>
              <option value=''>Select Status</option>
              {statues.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name='status'
              render={({ message }) => (
                <p className='text-red-500 text-sm'>{message}</p>
              )}
            />
          </div>

          <div>
            <label htmlFor='priority'>Priority</label>
            <select
              {...register('priority', {
                required: 'Priority is Required',
              })}
              id='priority'
              className='capitalize'>
              <option value=''>Select Priority</option>
              {priorities.map((prio) => (
                <option key={prio} value={prio}>
                  {prio}
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name='priority'
              render={({ message }) => (
                <p className='text-red-500 text-sm'>{message}</p>
              )}
            />
          </div>

          <div>
            <label htmlFor='assignedTo'>Assigned Members</label>
            <select
              {...register('assignedTo', {
                required: 'Assigned Member is Required',
              })}
              id='assignedTo'
              className='capitalize'>
              <option value=''>Select Members</option>
              {members.map((member) => (
                <option key={member} value={member}>
                  Team Member {member}
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name='assignedTo'
              render={({ message }) => (
                <p className='text-red-500 text-sm'>{message}</p>
              )}
            />
          </div>

          <div className='mt-2'>
            <input
              type='checkbox'
              className='permission_checkbox hidden'
              id='isAssigned'
              {...register('isAssigned')}
            />
            <label
              htmlFor='isAssigned'
              className='flex items-center cursor-pointer select-none gap-1'>
              <span className='un_checked_box'>
                <MdOutlineCheckBoxOutlineBlank className='text-2xl text-cyan-800' />
              </span>
              <span className='checked_box hidden'>
                <MdOutlineCheckBox className='text-2xl text-cyan-800' />
              </span>

              <span className='capitalize text-md'>Is Assigned</span>
            </label>
            <ErrorMessage
              errors={errors}
              name='isAssigned'
              render={({ message }) => (
                <p className='text-red-500 text-sm'>{message}</p>
              )}
            />
          </div>
          <button
            type='submit'
            disabled={submitting}
            className='mb-5 mt-4 col-span-full justify-self-center self-center px-8 transition-all py-1 text-black rounded-2xl bg-teal-100 border-2 border-teal-500 font-semibold hover:bg-teal-500 hover:text-teal-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-500'>
            {submitting ? (
              <LuLoader className='animate-spin text-2xl' />
            ) : (
              'SAVE'
            )}
          </button>
        </form>
      </div>
    </div>,
    document.getElementById('modals')!
  );
};

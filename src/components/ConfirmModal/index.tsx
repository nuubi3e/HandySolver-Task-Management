import { createPortal } from 'react-dom';
import { LuLoader } from 'react-icons/lu';

type Props = {
  onClose: () => void;
  onSuccess: () => void;
  submitting: boolean;
};

export const ConfirmModal = ({ onClose, onSuccess, submitting }: Props) => {
  return createPortal(
    <div
      onClick={(e) =>
        !(e.target as HTMLDivElement).closest('#confirmModal') && onClose()
      }
      className='fixed top-0 left-0 w-[100dvw] py-10 h-[100dvh] z-[999]  bg-black bg-opacity-20 backdrop-blur-sm'>
      <div
        id='confirmModal'
        className='w-[20%] bg-white p-6 flex flex-col gap-6 relative rounded-xl shadow-md mt-5 mx-auto'>
        <h3 className='text-4xl font-medium text-center'>Are you Sure?</h3>

        <div className='flex justify-center gap-2'>
          <button
            type='button'
            disabled={submitting}
            onClick={onClose}
            className='rounded-md px-4 py-1 bg-green-600 text-green-50 font-medium transition-all hover:bg-green-700'>
            Cancel
          </button>
          <button
            type='button'
            disabled={submitting}
            onClick={onSuccess}
            className='rounded-md px-4 py-1 bg-red-600 text-red-50 font-medium transition-all hover:bg-red-700'>
            {submitting ? <LuLoader className='animate-spin' /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modals')!
  );
};

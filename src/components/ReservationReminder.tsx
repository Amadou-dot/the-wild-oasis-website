'use client';
import { useReservation } from '@/context/ReservationContext';
import { getFormattedDateString } from '@/lib/helperFunctions';
import { XMarkIcon } from '@heroicons/react/24/solid';

function ReservationReminder() {
  const { dateRange, setDateRange } = useReservation();

  if (!dateRange || !dateRange?.start || !dateRange.end) return null;

  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center'>
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br />{' '}
        {getFormattedDateString(dateRange)}
      </p>
      <button className='rounded-full p-1 hover:bg-accent-600 transition-all'>
        <XMarkIcon className='h-5 w-5' onClick={() => setDateRange(null)} />
      </button>
    </div>
  );
}

export default ReservationReminder;

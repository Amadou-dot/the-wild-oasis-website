import { getBookedDatesByCabinId, getSettings } from '@/lib/data-service';
import { Cabin } from '@/types/Cabin.type';
import { notFound } from 'next/navigation';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { auth } from '@/lib/auth';
import LoginMessage from './LoginMessage';

export default async function Reservation({ cabin }: { cabin: Cabin }) {
  const session = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  if (!settings || !bookedDates) return notFound();
  return (
    <div className='grid grid-cols-2 border-primary-800 min-h-[400px] '>
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? <ReservationForm cabin={cabin} user={session.user}/> : <LoginMessage />}
    </div>
  );
}

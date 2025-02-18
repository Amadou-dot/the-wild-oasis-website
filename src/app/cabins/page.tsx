export const metadata = {
  title: 'Cabins',
  description: 'Our cozy cabins',
};

import CabinList from '@/components/CabinList';
import Filter from '@/components/Filter';
import Spinner from '@/components/Spinner';
import { CapacityFilter } from '@/types/Other.types';
import { Suspense } from 'react';
// export const revalidate = 3600; // revalidate every hour // searchParams makes this unnecessary
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ capacity: CapacityFilter }>;
}) {
  const { capacity } = await searchParams;
  const filter = capacity || 'all';

  return (
    <div>
      <h1 className='text-4xl mb-5 text-accent-400 font-medium'>
        Our Luxury Cabins
      </h1>
      <p className='text-primary-200 text-lg mb-10'>
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <Suspense
      key={filter}
        fallback={
          <Spinner
            label='Loading cabins'
            color='primary'
            labelColor='primary'
          />
        }>
        <div className='flex justify-end'>
        <Filter />
        </div>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}

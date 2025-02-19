import Cabin from '@/components/Cabin';
import Heading from '@/components/Heading';
import Reservation from '@/components/Reservation';
import Spinner from '@/components/Spinner';
import { getAllCabins, getCabinById } from '@/lib/data-service';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
interface props {
  params: Promise<{ cabinId: string }>;
}

export async function generateMetadata({ params }: props) {
  const data = await params;
  const cabinId = data.cabinId;
  const cabin = await getCabinById(parseInt(cabinId));
  if (!cabin) return { title: 'Cabin not found' };
  return { title: `Cabin ${cabin.name}`, description: cabin.description };
}

export async function generateStaticParams() {
  const cabins = await getAllCabins();
  const ids = cabins?.map(cabin => {
    return { cabinId: cabin.id.toString() };
  });
  return ids;
}

export default async function Page({ params }: props) {
  const data = await params;
  const cabinId = data.cabinId;
  const cabin = await getCabinById(parseInt(cabinId));
  if (!cabin) return notFound();

  return (
    <div className='max-w-6xl mx-auto mt-8'>
      <Cabin cabin={cabin} />
      <div>
        <Heading label={`Reserve ${cabin.name} today. Pay on arrival.`} />
        <Suspense fallback={<Spinner label='Getting reservation props' />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

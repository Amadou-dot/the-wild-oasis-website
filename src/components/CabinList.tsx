import { getAllCabins } from '@/lib/CabinDB';
import CabinCard from './CabinCard';
import { CapacityFilter } from '@/types/Other.types';

export default async function CabinList({
  filter,
}: {
  filter?: CapacityFilter;
}) {
  const cabins = await getAllCabins();
  if (!cabins || !cabins.length) return null;
  let displayCabins = cabins;

  switch (filter) {
    case 'small':
      displayCabins = cabins.filter(cabin => cabin.maxCapacity <= 3);
      break;
    case 'medium':
      displayCabins = cabins.filter(
        cabin => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
      );
      break;
    case 'large':
      displayCabins = cabins.filter(cabin => cabin.maxCapacity >= 8);
      break;
    default:
      displayCabins = cabins;
      break;
  }

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14'>
      {displayCabins.map(cabin => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

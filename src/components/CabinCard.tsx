import { Cabin } from '@/types/Cabin.type';
import { UsersIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

export default function CabinCard({ cabin }: { cabin: Cabin }) {
  const { id, name, maxCapacity, imageURL, regularPrice, discount } = cabin;

  return (
    <div className='grid grid-cols-[1fr_3fr] border border-primary-900'>
      <div className='relative'>
        <Image 
          src={imageURL}
          alt={name}
          className='object-cover border border-primary-900'
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
        />
      </div>
      <div className='flex flex-col border border-primary-900 border-l-0 gap-2'>
        <div className='ml-5 px-4 py-3'>
          <h2 className='text-2xl font-medium text-accent-400 mb-5'>
            Cabin {name}
          </h2>
          <div className='flex items-center space-x-2'>
            <UsersIcon className='h-5 w-5 text-primary-200' />
            <span>For up to <span className='font-bold'>{maxCapacity}</span> guests</span>
          </div>
          <p className='text-right text-2xl'>
            ${discount ? regularPrice - discount : regularPrice} <span className={`${discount ? 'text-base text-primary-500 line-through':'hidden'}`}>{discount && `$${discount}`}</span>
            <span className='text-base text-gray-600'> / night</span>
          </p>
        </div>
        <div className='grid grid-cols-2 *:py-3 *:px-4 *:border-b-0'>
          <div className='border border-primary-900'></div>
          <div className='border border-primary-900 inline-block hover:bg-accent-600 transition-all hover:text-primary-950 w-full'>
            <Link href={`/cabins/${id}`} className=''>
              Details & reservation &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

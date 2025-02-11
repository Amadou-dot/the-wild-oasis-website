'use client';

import Link from 'next/link';

function NotFound() {
  return (
    <section className='bg-primary-950'>
      <div className='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
        <div className='mx-auto max-w-screen-sm text-center'>
          <h1 className='mb-4 text-4xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500'>
            404
          </h1>
          <p className='mb-4 text-3xl tracking-tight font-bold md:text-4xl text-primary-400'>
            Cabin not found
          </p>
          <p className='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            We&apos;ve searched everywhere, but we can&apos;t find the cabin
            you&apos;re looking for. You&apos;ll find more to explore on the
            cabins page.
          </p>
          <Link
            href='/cabins'
            className='text-primary-800 bg-accent-500 px-6 py-4 inline-flex text-lg hover:bg-accent-700 focus:ring-4 focus:outline-none focus:ring-accent-300 font-medium  text-center my-4'>
            Back to Cabins
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;

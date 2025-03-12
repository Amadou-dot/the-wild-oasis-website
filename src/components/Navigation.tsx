import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className='z-10 text-xl'>
      <ul className='flex gap-16 items-center'>
        <li>
          <Link
            href='/cabins'
            className='hover:text-accent-400 transition-colors'>
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href='/about'
            className='hover:text-accent-400 transition-colors'>
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors flex items-center gap-4'>
              <Image
                width={32}
                height={32}
                className='rounded-full'
                src={session.user.image}
                alt='profile Image'
                referrerPolicy='no-referrer'
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href='/account'
              className='hover:text-accent-400 transition-colors'>
              Login
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

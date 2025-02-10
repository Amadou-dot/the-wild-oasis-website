import SideNavigation from '@/components/SideNavigation';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-[16rem_1fr] h-full gap-12'>
      <SideNavigation />
      <div className='py-2'>{children}</div>
    </div>
  );
}

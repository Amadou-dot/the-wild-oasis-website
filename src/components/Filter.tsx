'use client';
import { Tab, Tabs } from '@heroui/tabs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Key } from 'react';

const filterOptions = [
  { label: 'All Cabins', key: 'all' },
  { label: 'Small Cabins (1-3)', key: 'small' },
  { label: 'Medium Cabins (4-7)', key: 'medium' },
  { label: 'Large Cabins (8+)', key: 'large' },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get('capacity') ?? 'all';
  const router = useRouter(); // allows for programmatic navigation
  const pathName = usePathname(); // gets the current path
  const handleFilterChange = (key: Key) => {
    const params = new URLSearchParams();
    params.set('capacity', key.toString());
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <Tabs
    classNames={{
      tabContent: "group-data-[selected=true]:text-accent-400 text-primary-300",
      cursor: "w-full bg-accent-500",
    }}
      variant='underlined'
      radius='none'
      aria-label='Filter options'
      onSelectionChange={handleFilterChange}
      selectedKey={activeFilter}>
      {filterOptions.map(({ label, key }) => (
        <Tab key={key} title={label} />
      ))}
    </Tabs>
  );
}

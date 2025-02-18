'use client';
import { Select, SelectItem } from '@heroui/select';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const filterOptions = [
  { label: 'All Cabins', key: 'all' },
  { label: 'Small Cabins (1-3)', key: 'small' },
  { label: 'Medium Cabins (4-7)', key: 'medium' },
  { label: 'Large Cabins (8+)', key: 'large' },
];

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter(); // allows for programmatic navigation
  const pathName = usePathname(); // gets the current path
  const activeFilter = searchParams.get('capacity') ?? 'all';
  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams();
    params.set('capacity', value);
    console.log(value);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <Select
      defaultSelectedKeys={[activeFilter]}
      className='max-w-xs'
      classNames={{
        label: 'group-data-[filled=true]:-translate-y-5',
        trigger: 'min-h-16',
        listboxWrapper: 'max-h-[400px]',
      }}
      items={filterOptions}
      label='Filter by capacity'
      placeholder='All Cabins'
      listboxProps={{
        itemClasses: {
          base: [
            'text-primary-100',
            'transition-opacity',
            'data-[hover=true]:text-primary-200',
            'data-[hover=true]:bg-primary-700',
            'data-[selectable=true]:focus:bg-primary-600',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:bg-primary-500',
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: 'before:bg-primary-800',
          content: 'p-0 border-small border-divider bg-primary-800',
        },
      }}
      // how the selected value is rendered
      renderValue={options => {
        return options.map(option => (
          <SelectElement key={option.key}>{option.data?.label}</SelectElement>
        ));
      }}
      variant='underlined'>
      {option => (
        <SelectItem
          onPress={() => handleFilterChange(option.key)}
          key={option.key}
          textValue={option.label}>
          {/* the text that is displayed in the listbox */}
          <SelectElement isActive={activeFilter === option.key}>
            {option.label}
          </SelectElement>
        </SelectItem>
      )}
    </Select>
      
  );
}

function SelectElement({
  children,
  isActive,
}: {
  children: React.ReactNode | string;
  isActive?: boolean;
}) {
  return (
    <span
      className={clsx(
        'text-sm',
        isActive ? 'text-accent-400' : 'text-primary-100'
      )}>
      {children}
    </span>
  );
}

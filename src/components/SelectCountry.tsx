'use client';
import { getCountries } from '@/lib/data-service';
import { Country } from '@/types/Other.types';
import { Avatar } from '@heroui/avatar';
import { Select, SelectItem } from '@heroui/select';
import { useEffect, useState } from 'react';
import { SelectorIcon } from './ui/SelectorIcon';
type SelectCountryProps = {
  defaultCountry: string;
  name: string;
  id: string;
};
export default function SelectCountry({
  defaultCountry,
  name,
  id,
}: SelectCountryProps) {
  // const [flag, setFlag] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    (async () => {
      const countries = await getCountries();
      setCountries(countries);
      // const countryFlag =
      //   countries.find(country => country.name === defaultCountry)?.flag ?? '';
      // setFlag(countryFlag);
    })();
  }, [defaultCountry]);

  return (
    <Select
      selectorIcon={<SelectorIcon />}
      defaultSelectedKeys={[defaultCountry]}
      isVirtualized
      name={name}
      id={id}
      classNames={{
        label: '!text-primary-100',
        trigger: 'bg-primary-300 data-[hover=true]:bg-primary-300/80 h-12',
      }}
      itemHeight={50}
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
          content: 'p-2 border-small border-divider bg-primary-800',
        },
      }}
      items={countries}
      label='Where are you from'
      labelPlacement='outside'
      placeholder='Select country...'
      renderValue={items => {
        return items.map(item => (
          <div
            key={item.key}
            className='flex items-center gap-2 text-primary-800'>
            <Avatar
              alt={item.data?.name}
              className='flex-shrink-0'
              size='sm'
              src={item.data?.flag}
            />
            <span>{item.data?.name}</span>
          </div>
        ));
      }}>
      {country => (
        <SelectItem key={country.name} textValue={country.name}>
          <div className='flex gap-2 items-center'>
            <Avatar
              alt={country.name}
              className='flex-shrink-0'
              size='sm'
              src={country?.flag}
            />

            <span className='text-small'>{country.name}</span>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}

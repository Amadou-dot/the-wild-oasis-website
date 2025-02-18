'use client';
import { Select, SelectItem, SelectProps } from '@heroui/select';
import clsx from 'clsx';

type WrapperProps = {
  handleChange?: (value: string) => void;
  items: { label: string; key: string }[];
  defaultSelectedKeys: string[];
  label: string;
  placeholder: string;
};

type CustomSelectProps = SelectProps & WrapperProps;

export default function SelectWrapper(props: CustomSelectProps) {
  const {
    handleChange,
    items,
    defaultSelectedKeys,
    label,
    placeholder,
    className = 'max-w-xs',
    classNames = {
      label: 'group-data-[filled=true]:-translate-y-5',
      trigger: 'min-h-16',
      listboxWrapper: 'max-h-[400px]',
    },
    ...rest
  } = props;
  
  return (
    <Select
      {...rest}
      defaultSelectedKeys={defaultSelectedKeys}
      items={items}
      label={label}
      placeholder={placeholder}
      className={className}
      classNames={classNames}
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
      renderValue={(options) =>
        options.map(option => (
          <SelectElement key={option.key}>
            {option.data?.label}
          </SelectElement>
        ))
      }>
      {items.map(option => (
        <SelectItem
          onPress={() => handleChange && handleChange(option.key)}
          key={option.key}
          textValue={option.label}>
          <SelectElement isActive={defaultSelectedKeys.includes(option.key)}>
            {option.label}
          </SelectElement>
        </SelectItem>
      ))}
    </Select>
  );
}

function SelectElement({
  children,
  isActive,
}: {
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <span className={clsx('text-sm', isActive ? 'text-accent-400' : 'text-primary-100')}>
      {children}
    </span>
  );
}

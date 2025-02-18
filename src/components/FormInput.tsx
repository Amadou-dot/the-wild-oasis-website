import { Input, InputProps } from '@heroui/input';

export default function FormInput(props: InputProps) {
  const { labelPlacement = 'outside', ...rest } = props;
  return (
    <Input
      {...rest}
      classNames={{
        label: 'dark:!text-primary-100',
        input: [
          'bg-transparent',
          'text-primary-800',
          'placeholder:text-primary-800',
        ],
        innerWrapper: 'bg-transparent',
        inputWrapper: [
          'bg-primary-300',
          'dark:hover:bg-primary-300/80',
          'dark:group-data-[focus=true]:bg-primary-300',
        ],
      }}
      radius='none'
      labelPlacement={labelPlacement}
    />
  );
}

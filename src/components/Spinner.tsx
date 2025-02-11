import { Spinner as Loader, SpinnerProps } from '@heroui/spinner';

export default function Spinner(props: SpinnerProps) {
  return (
    <div className='min-w-screen flex justify-center'>
      <Loader {...props} />
    </div>
  );
}

export default function Heading({ label }: { label: string }) {
  return (
    <h2 className='text-5xl font-semibold text-center m-10 text-accent-400'>
      {label}
    </h2>
  );
}

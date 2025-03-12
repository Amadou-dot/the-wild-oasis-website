import UpdateProfileForm from '@/components/UpdateProfileForm';
import { getCountries } from '@/lib/data-service';

export const metadata = {
  title: 'Guest profile',
};
export default async function Page() {
  // get countries and pass it down.
  const countries = await getCountries();
  return (
    <div>
      <h2 className='font-semibold text-2xl text-accent-400 mb-4'>
        Update your guest profile
      </h2>

      <p className='text-lg mb-8 text-primary-200'>
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm countries={countries}/>
    </div>
  );
}

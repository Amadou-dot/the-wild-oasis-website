'use client';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import FormInput from './FormInput';
import SelectCountry from './SelectCountry';

export default function UpdateProfileForm() {
  return (
    <Form
      className='w-full bg-primary-900 px-8 py-12 flex flex-col gap-8'
      validationBehavior='aria'>
      <FormInput
        isDisabled
        label='First name'
        placeholder='Enter your first name'
        name='first_name'
      />

      <FormInput
        isDisabled
        errorMessage='Please enter a valid email'
        label='Email'
        name='email'
        placeholder='Enter your email'
        type='email'
      />

      <SelectCountry
        name='nationality'
        id='nationality'
        defaultCountry='Senegal'
      />

      <FormInput
        label='National ID number'
        placeholder=' Your National ID number'
        name='national_id'
      />

      <div className='flex justify-end items-center gap-6 w-full'>
        <Button
          className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 rounded-none'
          size='lg'
          type='submit'>
          Update profile
        </Button>
      </div>
    </Form>
  );
}

'use client';
import { useReservation } from '@/context/ReservationContext';
import { validateMinimumRange } from '@/lib/helperFunctions';
import { Cabin } from '@/types/Cabin.type';
import { Settings } from '@/types/Settings.type';
import { DateRangePicker } from '@heroui/date-picker';
import {
  CalendarDate,
  DateValue,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import { RangeValue } from '@react-types/shared';

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: {
  settings: Settings;
  bookedDates: Date[];
  cabin: Cabin;
}) {
  const { dateRange, setDateRange } = useReservation();

  const { minBookingLength, maxBookingLength } = settings;
  const isInvalid = validateMinimumRange(dateRange, minBookingLength);
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  const { day, month, year } = today(getLocalTimeZone());
  /** the last day that can be booked */
  const maxDate = new CalendarDate(year, month, day).add({
    days: maxBookingLength,
  });
  return (
    <div className='flex flex-col justify-between'>
      <DateRangePicker
        defaultOpen
        selectorButtonPlacement='start'
        errorMessage={
          isInvalid ? `Please select at least ${minBookingLength} days` : ''
        }
        isInvalid={isInvalid}
        minValue={today(getLocalTimeZone())}
        shouldForceLeadingZeros
        calendarProps={{
          classNames: {
            base: 'bg-background',
            headerWrapper: 'pt-4 bg-primary-900',
            prevButton: 'border-1 border-default-200 rounded-small',
            nextButton: 'border-1 border-default-200 rounded-small',
            gridHeader:
              'bg-primary-900 shadow-none border-b-1 border-default-100',
            cellButton: [
              'data-[today=true]:bg-accent-600 data-[today=true]:data-[selected=true]:bg-accent-800:!rounded-none',
              'data-[selected=true]:bg-accent-800',
              'data-[selected=true]:data-[selected-start=true]:!rounded-none',
              'rounded-none data-[selected=true]:!rounded-none',
            ],
          },
        }}
        classNames={{
          calendarContent: 'bg-primary-900 max-h-[300px]',
        }}
        calendarWidth={400}
        radius='none'
        label='Stay duration'
        variant='bordered'
        onChange={value => {
          if (value) setDateRange(value);
        }}
        value={dateRange as RangeValue<DateValue>}
        maxValue={maxDate}
      />

      <div className='flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]'>
        <div className='flex items-baseline gap-6'>
          <p className='flex gap-2 items-baseline'>
            {discount > 0 ? (
              <>
                <span className='text-2xl'>${regularPrice - discount}</span>
                <span className='line-through font-semibold text-primary-700'>
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className='text-2xl'>${regularPrice}</span>
            )}
            <span className=''>/night</span>
          </p>
          {numNights ? (
            <>
              <p className='bg-accent-600 px-3 py-2 text-2xl'>
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className='text-lg font-bold uppercase'>Total</span>{' '}
                <span className='text-2xl font-semibold'>${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {dateRange && (dateRange.start || dateRange.end) ? (
          <button onClick={() => setDateRange(null)}>Clear</button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;

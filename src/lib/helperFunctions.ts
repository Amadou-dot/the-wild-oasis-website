import { DateValue, getLocalTimeZone } from '@internationalized/date';
import { RangeValue } from '@react-types/shared';
import { format, isWithinRange } from 'date-fns';

export const validateMinimumRange = (
  value: RangeValue<DateValue> | null,
  min: number
) => {
  return (
    (value &&
      value.start &&
      value.end &&
      value.end.compare(value.start) < min) ||
    undefined
  );
};

export function isAlreadyBooked(
  range: RangeValue<DateValue>,
  datesArr: Date[]
) {
  return (
    range.start &&
    range.end &&
    datesArr.some(date =>
      isWithinRange(
        date,
        range.start.toDate(getLocalTimeZone()),
        range.end.toDate(getLocalTimeZone())
      )
    )
  );
}

export function getFormattedDateString(date: RangeValue<DateValue>) {
  return `From ${format(
    date.start.toDate(getLocalTimeZone()),
    'MMMM dd, yyyy'
  )} to ${format(date.end.toDate(getLocalTimeZone()), 'MMMM dd, yyyy')}`;
}

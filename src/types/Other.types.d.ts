import { Booking } from './Booking.type';
import { Cabin } from './Cabin.type';

export type ReservationBooking = Booking & {
  cabins: Cabin;
};

export type SearchParams = {
  capacity: string;
};

export type CapacityFilter = 'all' | 'small' | 'medium' | 'large';
export type Booking = {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  hasBreakfast: boolean;
  isPaid: boolean;
  userNotes: string;
  cabinId: number;
  guestId: number;
};

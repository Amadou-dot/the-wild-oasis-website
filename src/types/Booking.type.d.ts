export type Booking = {
  id: number;
  created_at: string;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  totalPrice: number;
  extrasPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  hasBreakfast: boolean;
  isPaid: boolean;
  userNotes: string;
  cabinId: number;
  guestId: number;
};

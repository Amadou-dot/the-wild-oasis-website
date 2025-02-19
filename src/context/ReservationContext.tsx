'use client';
import { DateValue } from '@internationalized/date';
import { RangeValue } from '@react-types/shared';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
interface ReservationContextType {
  dateRange: RangeValue<DateValue> | null;
  setDateRange: Dispatch<SetStateAction<RangeValue<DateValue> | null>>;
}
const ReservationContext = createContext<ReservationContextType>({} as ReservationContextType);

export function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(
    null
  );
  return (
    <ReservationContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};

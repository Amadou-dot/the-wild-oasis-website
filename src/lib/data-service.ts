import { Country } from '@/types/Other.types';
import { passwordConfig } from './config';
import Database, { createDatabaseConnection } from './Database';
import { Guest } from '@/types/Guest.type';

// Add a check to ensure database operations only run on the server
const isServer = typeof window === 'undefined';

let database: Database | null = null;

async function getDatabase(): Promise<Database> {
  if (!isServer) {
    throw new Error('Database operations can only be performed on the server');
  }
  
  if (!database) {
    database = await createDatabaseConnection(passwordConfig);
  }
  return database;
}

/////////////
//* GET
//? Bookings
export async function getBookingById(id: number) {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.getBookingById(id);
  return data;
}

export async function getAllBookings() {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.getAllBookings();
  return data;
}

export async function getBookedDatesByCabinId(id: number) {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.getBookedDatesByCabinId(id);
  return data;
}

export async function getBookingByGuestId(id: number) {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.getBookingByGuestId(id);
  return data;
}

//? Cabins
export async function getCabinById(id: number) {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.getCabinById(id);
  return data;
}

export async function getAllCabins() {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.getAllCabins();
  return data;
}

export async function getCabinPrice(id: number) {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.getCabinPrice(id);
  return data;
}

//? Settings
export async function getSettings() {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.getSettings();
  return data;
}

//? Guests
export async function getGuestByEmail(email: string) {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.getGuestByEmail(email);
  return data;
}

export async function createGuest(newGuest: Omit<Guest, 'id' | 'created_at'>) {
  if (!isServer) return null;
  const db = await getDatabase();
  const data = await db.createGuest(newGuest);
  return data;
}
//? Other
export async function getCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries as Country[];
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
//* CREATE

// export async function createGuest(newGuest) {
//   const { data, error } = await supabase.from('guests').insert([newGuest]);

//   if (error) {
//     console.error(error);
//     throw new Error('Guest could not be created');
//   }

//   return data;
// }

// export async function createBooking(newBooking) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .insert([newBooking])
//     // So that the newly created object gets returned!
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be created');
//   }

//   return data;
// }

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
// export async function updateGuest(id:number, updatedFields) {
//   const { data, error } = await supabase
//     .from('guests')
//     .update(updatedFields)
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Guest could not be updated');
//   }
//   return data;
// }

// export async function updateBooking(id:number, updatedFields) {
//   const { data, error } = await supabase
//     .from('bookings')
//     .update(updatedFields)
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error('Booking could not be updated');
//   }
//   return data;
// }

/////////////
// DELETE
// ! This function should be used with caution as it deletes the booking from the database
// ! and it cannot be undone
export async function deleteBooking(id: number) {
  const db = await getDatabase();
  const data = await db.deleteBooking(id);
  return data;
}

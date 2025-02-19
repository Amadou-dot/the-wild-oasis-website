
/////////////
//* GET

import { Country } from "@/types/Other.types";
import { passwordConfig } from "./config";
import { createDatabaseConnection } from "./Database";

const database = await createDatabaseConnection(passwordConfig);
//? Bookings
export async function getBookingById(id: number) {
  const data = await database.getBookingById(id);
  return data;
}

export async function getAllBookings() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data =  await database.getAllBookings();
  return data;
}

export async function getBookedDatesByCabinId(id: number) {
  const data = await database.getBookedDatesByCabinId(id);
  return data;
}

export async function getBookingByGuestId(id: number) {
  const data = await database.getBookingByGuestId(id);
  return data;
}

//? Cabins
export async function getCabinById(id: number) {
  const data = await database.getCabinById(id);
  return data;
}

export async function getAllCabins() {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data =  await database.getAllCabins();
  return data;
}

export async function getCabinPrice(id: number) {
  const data = await database.getCabinPrice(id);
  return data;
}

//? Settings
export async function getSettings() {
  const data = await database.getSettings();
  return data;
}

//? Guests


//? Other
export async function getCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries as  Country[];
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
export async function deleteBooking(id:number) {
  const data = await database.deleteBooking(id);
  return data;
}

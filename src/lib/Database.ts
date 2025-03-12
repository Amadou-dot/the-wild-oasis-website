import { Booking } from '@/types/Booking.type';
import { Cabin, CabinPrice } from '@/types/Cabin.type';
import { Guest } from '@/types/Guest.type';
import { Settings } from '@/types/Settings.type';
import { supabase } from './config';

// Add a check to ensure this code only runs on the server
const isServer = typeof window === 'undefined';

let database: Database;
/**
 * Class representing a Database.
 */
export default class Database {
  /**
   * Indicates whether the database is connected.
   */
  connected = false;

  /**
   * Creates an instance of Database.
   */
  constructor() {
    if (!isServer) {
      console.warn('Database operations should only be performed on the server');
    }
    this.connected = true;
  }

  /**
   * Connects to the database.
   * @returns {Promise<void>} A promise that resolves when the connection is complete.
   */
  async connect(): Promise<void> {
    if (!isServer) return;
    console.log('Supabase client initialized');
    this.connected = true;
  }

  /**
   * Disconnects from the database.
   * @returns {Promise<void>} A promise that resolves when the disconnection is complete.
   */
  async disconnect(): Promise<void> {
    if (this.connected) {
      this.connected = false;
      console.log('Database disconnected successfully.');
    }
  }

  /**
   * Retrieves a cabin by its ID from the database.
   *
   * @param {number} id - The ID of the cabin to retrieve.
   * @returns {Promise<Cabin | null>} A promise that resolves to the cabin object if found, or null if not found.
   */
  async getCabinById(id: number): Promise<Cabin | null> {
    try {
      const { data, error } = await supabase
        .from('Cabins')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching cabin by ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getCabinById:', error);
      return null;
    }
  }

  /**
   * Retrieves all cabins from the database.
   *
   * @returns {Promise<Cabin[] | null>} A promise that resolves to an array of Cabin objects.
   */
  async getAllCabins(): Promise<Cabin[] | null> {
    try {
      const { data, error } = await supabase
        .from('Cabins')
        .select('*');

      if (error) {
        console.error('Error fetching all cabins:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getAllCabins:', error);
      return null;
    }
  }

  /**
   * Retrieves the price details of a cabin by its ID.
   *
   * @param {number} id - The unique identifier of the cabin.
   * @returns {Promise<CabinPrice | null>} - A promise that resolves to the cabin price details.
   */
  async getCabinPrice(id: number): Promise<CabinPrice | null> {
    try {
      const { data, error } = await supabase
        .from('Cabins')
        .select('regularPrice, discount')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching cabin price:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getCabinPrice:', error);
      return null;
    }
  }

  /**
   * Retrieves a guest from the database using their email address.
   *
   * @param {string} email - The email address of the guest to retrieve.
   * @returns {Promise<Guest | null>} A promise that resolves to the guest object if found, or null if not found.
   */
  async getGuestByEmail(email: string): Promise<Guest | null> {
    try {
      const { data, error } = await supabase
        .from('Guests')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Error fetching guest by email:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getGuestByEmail:', error);
      return null;
    }
  }

  /**
   * Retrieves a booking from the database by its ID.
   *
   * @param {number} id - The ID of the booking to retrieve.
   * @returns {Promise<Booking | null>} A promise that resolves to the booking object if found, or null if not found.
   */
  async getBookingById(id: number): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('Bookings')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching booking by ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getBookingById:', error);
      return null;
    }
  }

  /**
   * Retrieves booking information for a given guest ID.
   *
   * @param guestId - The ID of the guest whose booking information is to be retrieved.
   * @returns {Promise<Booking | null>} A promise that resolves to an array of booking records for the specified guest ID.
   */
  async getBookingByGuestId(guestId: number): Promise<Booking | null> {
    try {
      const { data, error } = await supabase
        .from('Bookings')
        .select('*')
        .eq('guestId', guestId)
        .single();

      if (error) {
        console.error('Error fetching booking by guest ID:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getBookingByGuestId:', error);
      return null;
    }
  }

  /**
   * Retrieves all bookings from the database.
   *
   * @returns {Promise<Booking[] | null>} A promise that resolves to an array of bookings.
   */
  async getAllBookings(): Promise<Booking[] | null> {
    try {
      const { data, error } = await supabase
        .from('Bookings')
        .select('*');

      if (error) {
        console.error('Error fetching all bookings:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getAllBookings:', error);
      return null;
    }
  }

  /**
   * Retrieves booked dates for a specific cabin.
   * 
   * @param {number} cabinId - The ID of the cabin.
   * @returns {Promise<Date[] | null>} A promise that resolves to an array of booked dates.
   */
  async getBookedDatesByCabinId(cabinId: number): Promise<Date[] | null> {
    try {
      const { data, error } = await supabase
        .from('Bookings')
        .select('startDate')
        .eq('cabinId', cabinId)
        .gte('startDate', new Date().toISOString());

      if (error) {
        console.error('Error fetching booked dates:', error);
        return null;
      }

      return data.map(record => record.startDate);
    } catch (error) {
      console.error('Error in getBookedDatesByCabinId:', error);
      return null;
    }
  }

  /**
   * Retrieves settings from the database.
   * 
   * @returns {Promise<Settings | null>} A promise that resolves to the settings object.
   */
  async getSettings(): Promise<Settings | null> {
    try {
      const { data, error } = await supabase
        .from('Settings')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching settings:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getSettings:', error);
      return null;
    }
  }

  /**
   * Deletes a booking from the database.
   * 
   * @param {number} id - The ID of the booking to delete.
   * @returns {Promise<number | null>} A promise that resolves to the number of affected rows.
   */
  async deleteBooking(id: number): Promise<number | null> {
    try {
      const { error } = await supabase
        .from('Bookings')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting booking:', error);
        return null;
      }

      return 1; // Return 1 to indicate successful deletion
    } catch (error) {
      console.error('Error in deleteBooking:', error);
      return null;
    }
  }

  /**
   * Creates a new guest in the database.
   * 
   * @param {Omit<Guest, 'id' | 'created_at'>} guest - The guest data to insert.
   * @returns {Promise<number | null>} A promise that resolves to the ID of the created guest.
   */
  async createGuest(
    guest: Omit<Guest, 'id' | 'created_at'>
  ): Promise<number | null> {
    try {
      const { data, error } = await supabase
        .from('Guests')
        .insert([guest])
        .select('id')
        .single();

      if (error) {
        console.error('Error creating guest:', error);
        return null;
      }

      return data.id;
    } catch (error) {
      console.error('Error in createGuest:', error);
      return null;
    }
  }
}

/**
 * Creates a new database connection.
 * @returns {Promise<Database>} The database instance.
 */
export const createDatabaseConnection = async (): Promise<Database> => {
  if (!isServer) {
    console.warn('Database connections should only be created on the server');
    return new Database();
  }
  
  database = new Database();
  await database.connect();
  return database;
};

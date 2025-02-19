import { Booking } from '@/types/Booking.type';
import { Cabin, CabinPrice } from '@/types/Cabin.type';
import { Guest } from '@/types/Guest.type';
import { Settings } from '@/types/Settings.type';
import sql, { ConnectionPool, config } from 'mssql';

let database: Database;
/**
 * Class representing a Database.
 */
export default class Database {
  /**
   * Configuration object for the database connection.
   */
  config = {} as config;

  /**
   * Connection pool instance.
   */
  poolconnection: ConnectionPool | null = null;

  /**
   * Indicates whether the database is connected.
   */
  connected = false;

  /**
   * Creates an instance of Database.
   * @param {config} config - The configuration object for the database connection.
   */
  constructor(config: config) {
    this.config = config;
  }

  /**
   * Connects to the database.
   * @returns {Promise<ConnectionPool | void>} The connection pool instance or void if connection fails.
   */
  async connect(): Promise<ConnectionPool | void> {
    if (!this.config) return;
    if (this.poolconnection) return this.poolconnection;
    try {
      this.poolconnection = await sql.connect(this.config);
      this.connected = true;
      console.log('Database connected successfully.');
      return this.poolconnection;
    } catch (error) {
      console.error('Error connecting to the database:', error);
      this.connected = false;
    }
  }

  /**
   * Disconnects from the database.
   * @returns {Promise<void>} A promise that resolves when the disconnection is complete.
   */
  async disconnect(): Promise<void> {
    try {
      if (this.connected && this.poolconnection) {
        await this.poolconnection.close();
        this.connected = false;
        console.log('Database disconnected successfully.');
      }
    } catch (error) {
      console.error('Error disconnecting from the database:', error);
    }
  }

  /**
   * Executes a SQL query.
   * @param {string} query - The SQL query to execute.
   * @returns {Promise<<T>> | null} The number of rows affected by the query.
   */
  async executeQuery<T>(query: string): Promise<T | null> {
    if (!this.poolconnection) return null;
    try {
      const request = this.poolconnection.request();
      const result = await request.query(query);

      return result.recordset as unknown as T;
    } catch (error) {
      console.error('Error executing query:', error);
      return null;
    }
  }

  /**
   * Retrieves a cabin by its ID from the database.
   *
   * @param {number} id - The ID of the cabin to retrieve.
   * @returns {Promise<Cabin | null>} A promise that resolves to the cabin object if found, or null if the connection is not established or the cabin is not found.
   */
  async getCabinById(id: number): Promise<Cabin | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query<Cabin>('SELECT * FROM Cabins WHERE id = @id');
    return result.recordset[0];
  }

  /**
   * Retrieves all cabins from the database.
   *
   * @returns {Promise<Cabin[] | null>} A promise that resolves to an array of Cabin objects if the connection is established, or null if there is no connection.
   */
  async getAllCabins(): Promise<Cabin[] | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request.query<Cabin>('SELECT * FROM Cabins');
    return result.recordset;
  }

  /**
   * Retrieves the price details of a cabin by its ID.
   *
   * @param {number} id - The unique identifier of the cabin.
   * @returns {Promise<CabinPrice | null>} - A promise that resolves to the cabin price details, or null if the connection is not established.
   *
   * @throws {Error} - Throws an error if the query execution fails.
   */
  async getCabinPrice(id: number): Promise<CabinPrice | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query<CabinPrice>(
        'SELECT regularPrice, discount FROM Cabins WHERE id = @id'
      );
    return result.recordset[0];
  }

  /**
   * Retrieves a guest from the database using their email address.
   *
   * @param {string} email - The email address of the guest to retrieve.
   * @returns {Promise<Guest | null>} A promise that resolves to the guest object if found, or null if not found or if the database connection is not established.
   */
  async getGuestByEmail(email: string): Promise<Guest | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request
      .input('email', sql.VarChar, email)
      .query<Guest>('SELECT * FROM Guests WHERE email = @email');
    return result.recordset[0];
  }

  /**
   * Retrieves a booking from the database by its ID.
   *
   * @param {number} id - The ID of the booking to retrieve.
   * @returns {Promise<Booking | null>} A promise that resolves to the booking object if found, or null if the connection is not established or the booking is not found.
   */
  async getBookingById(id: number): Promise<Booking | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, +id)
      .query<Booking>('SELECT * FROM Bookings WHERE id = @id');
    return result.recordset[0];
  }

  /**
   * Retrieves booking information for a given guest ID.
   *
   * @param guestId - The ID of the guest whose booking information is to be retrieved.
   * @returns {Promise<Booking | null>} A promise that resolves to an array of booking records for the specified guest ID, or null if the database connection is not established.
   */
  async getBookingByGuestId(guestId: number): Promise<Booking | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request
      .input('guestId', sql.Int, +guestId)
      .query<Booking>('SELECT * FROM Bookings WHERE guestId = @guestId');
    return result.recordset[0];
  }

  /**
   * Retrieves all bookings from the database.
   *
   * @returns {Promise<Booking[] | null>} A promise that resolves to an array of bookings if the connection is available, otherwise null.
   */
  async getAllBookings(): Promise<Booking[] | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request.query<Booking>('SELECT * FROM Bookings');
    return result.recordset;
  }

  async getBookedDatesByCabinId(cabinId: number): Promise<Date[] | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request
      .input('cabinId', sql.Int, cabinId)
      .query<Booking[]>(
        'SELECT startDate FROM Bookings WHERE cabinId = @cabinId AND startDate >= GETDATE()'
      );
    return result.recordset.map(record => record.startDate);
  }

  async getSettings(): Promise<Settings | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request.query<Settings>('SELECT * FROM Settings');
    return result.recordset[0];
  }

  async deleteBooking(id: number): Promise<number | null> {
    if (!this.poolconnection) return null;
    const request = this.poolconnection.request();
    const result = await request
      .input('id', sql.Int, id)
      .query<number>('DELETE FROM Bookings WHERE id = @id');
    return result.rowsAffected[0];
  }
}

/**
 * Creates a new database connection and initializes the Person table.
 * @param {config} passwordConfig - The configuration object for the database connection.
 * @returns {Promise<Database>} The database instance.
 */
export const createDatabaseConnection = async (
  passwordConfig: config
): Promise<Database> => {
  database = new Database(passwordConfig);
  await database.connect();
  return database;
};

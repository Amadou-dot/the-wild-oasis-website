export interface Settings {
  id: number;
  /** When the setting was created */
  created_at: Date;
  /** When the setting was last updated */
  updated_at: Date;
  /**Minimum booking length in days */
  minBookingLength: number;
  /**Maximum booking length in days */
  maxBookingLength: number;
  /**Maximum number of guests per booking */
  maxGuestsPerBooking: number;
  /** Price of the breakfast per guest */
  breakfastPrice: number;
}

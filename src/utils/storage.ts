import AsyncStorage from "@react-native-async-storage/async-storage";
import { Booking } from "../types";

const BOOKINGS_KEY = "BOOKINGS_V1";

export const loadBookingsFromStorage = async (): Promise<Booking[]> => {
  try {
    const data = await AsyncStorage.getItem(BOOKINGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveBookingsToStorage = async (bookings: Booking[]) => {
  try {
    await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  } catch {
    // silently fail – local persistence only
  }
};

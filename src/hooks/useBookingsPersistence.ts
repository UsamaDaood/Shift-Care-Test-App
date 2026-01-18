import { useEffect } from "react";
import { loadBookingsFromStorage, saveBookingsToStorage } from "../utils/storage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hydrateBookings } from "../store/bookingsSlice";

export const useBookingsPersistence = () => {
  const dispatch = useAppDispatch();
  const { bookings, hydrated } = useAppSelector(state => state.bookings);

  // Load bookings once on app start
  useEffect(() => {
    const fetchBookings = async () => {
      const stored = await loadBookingsFromStorage();
      if (stored) {
        dispatch(hydrateBookings(stored));
      }
    };
    fetchBookings();
  }, [dispatch]);

  // Save bookings whenever they change, only after hydrated
  useEffect(() => {
    if (hydrated) {
      saveBookingsToStorage(bookings);
    }
  }, [bookings, hydrated]);
};

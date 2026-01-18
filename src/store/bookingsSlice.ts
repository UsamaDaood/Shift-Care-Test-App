import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Booking = {
  doctorId: string;
  date: string;
  startTime: string;
};

type BookingState = {
  bookings: Booking[];
  hydrated: boolean; // ✅ track if initial load is done
};

const initialState: BookingState = {
  bookings: [],
  hydrated: false,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      const exists = state.bookings.some(
        b =>
          b.doctorId === action.payload.doctorId &&
          b.date === action.payload.date &&
          b.startTime === action.payload.startTime,
      );

      if (!exists) {
        state.bookings.push(action.payload);
      }
    },
    hydrateBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
      state.hydrated = true;
    },
  },
});

export const { addBooking, hydrateBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;

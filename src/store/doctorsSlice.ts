import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transformDoctors, Doctor } from "../utils/transformDoctors";

export const fetchDoctors = createAsyncThunk<Doctor[]>(
  "doctors/fetchDoctors",
  async () => {
    const response = await fetch(
      "https://raw.githubusercontent.com/suyogshiftcare/jsontest/main/available.json"
    );
    if (!response.ok) throw new Error("Failed to fetch doctors");

    const raw = await response.json();
    return transformDoctors(raw);
  }
);

type DoctorsState = {
  data: Doctor[];
  loading: boolean;
  error?: string;
};

const initialState: DoctorsState = {
  data: [],
  loading: false,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDoctors.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default doctorsSlice.reducer;

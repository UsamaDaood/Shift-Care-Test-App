export type AvailabilityWindow = {
  day: string; // e.g. "Monday"
  start: string; // "09:00"
  end: string;   // "17:00"
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  availability: AvailabilityWindow[];
};

export type TimeSlot = {
  doctorId: string;
  date: string; // ISO date
  startTime: string;
  endTime: string;
};

export type Booking = {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
};


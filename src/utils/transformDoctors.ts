import { v4 as uuid } from "uuid";

export type RawDoctorSlot = {
  name: string;
  timezone: string;
  day_of_week: string;
  available_at: string;
  available_until: string;
};

export type Doctor = {
  id: string;
  name: string;
  timezone: string;
  availability: {
    day_of_week: string;
    available_at: string;
    available_until: string;
  }[];
};

export const transformDoctors = (raw: RawDoctorSlot[]): Doctor[] => {
  const map = new Map<string, Doctor>();

  raw.forEach(slot => {
    if (!map.has(slot.name)) {
      map.set(slot.name, {
        id: uuid(),
        name: slot.name,
        timezone: slot.timezone,
        availability: [],
      });
    }

    const doctor = map.get(slot.name)!;
    doctor.availability.push({
      day_of_week: slot.day_of_week,
      available_at: slot.available_at.trim(),
      available_until: slot.available_until.trim(),
    });
  });

  return Array.from(map.values());
};

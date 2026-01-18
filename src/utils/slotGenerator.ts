import { AvailabilityWindow, TimeSlot } from "../types";

const SLOT_DURATION = 30; // minutes

const parseAMPM = (value: string) => {
  const cleaned = value.trim().toUpperCase(); // " 9:00AM" → "9:00AM"

  const match = cleaned.match(/(\d+):(\d+)(AM|PM)/);
  if (!match) {
    throw new Error(`Invalid time format: ${value}`);
  }

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3];

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return { hour, minute };
};

export function generateSlots(
  doctorId: string,
  date: string,
  window: AvailabilityWindow
): TimeSlot[] {
  const slots: TimeSlot[] = [];

  const start = parseAMPM(window.available_at);
  const end = parseAMPM(window.available_until);

  let current = new Date(date);
  current.setHours(start.hour, start.minute, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(end.hour, end.minute, 0, 0);

  while (current < endTime) {
    const slotEnd = new Date(current.getTime() + SLOT_DURATION * 60000);

    if (slotEnd <= endTime) {
      slots.push({
        doctorId,
        date,
        startTime: current.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: slotEnd.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    }

    current = slotEnd;
  }

  return slots;
}

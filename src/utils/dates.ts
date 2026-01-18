export const getNext7Days = () => {
  const days: { label: string; date: string }[] = [];

  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);

    days.push({
      label: d.toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
      }),
      date: d.toISOString().split("T")[0],
    });
  }

  return days;
};

import Day from "./day";

export const generateDays = (points) => {
  const daysNames = new Set();
  const daysMap = new Map();
  let days = [];

  points.forEach((it) => {
    const day = new Date(it.point.time.start);

    day.setHours(0, 0, 0, 0);
    day.setFullYear(new Date().getFullYear());
    daysNames.add(day.getTime());
  });

  daysNames.forEach((day) => {
    daysMap.set(
        new Date(day),
        points.filter((it) => {
          return filterDays({daysItem: day, point: it.point});
        })
    );
  });

  daysMap.forEach((pointsItems, day) => {
    days.push(new Day(day, pointsItems));
  });

  days = days.sort((a, b) => {
    return a.day - b.day;
  });

  days.forEach((it, index) => {
    it.number = index + 1;
  });

  return days;
};

const filterDays = ({daysItem, point}) => {
  daysItem = new Date(daysItem);
  return (
    point.time.start.getMonth() === daysItem.getMonth() &&
    point.time.start.getDate() === daysItem.getDate()
  );
};

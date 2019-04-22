import Day from "./day";

export const generateDays = (points) => {
  const daysNames = new Set();

  points.forEach((it) => {
    const day = new Date(it.point.time.start);

    day.setHours(0, 0, 0, 0);
    day.setFullYear(new Date().getFullYear());
    daysNames.add(day.getTime());
  });

  return [...daysNames]
    .map((day) => {
      day = new Date(day);
      const pointsItems = points.filter((it) => {
        return filterDays({daysItem: day, point: it.point});
      });

      return new Day(day, pointsItems);
    })
    .sort((a, b) => {
      return a.day - b.day;
    })
    .forEach((it, index) => {
      it.number = index + 1;
    });
};

const filterDays = ({daysItem, point}) => {
  daysItem = new Date(daysItem);
  return (
    point.time.start.getMonth() === daysItem.getMonth() &&
    point.time.start.getDate() === daysItem.getDate()
  );
};

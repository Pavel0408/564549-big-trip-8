export const addLeadingZero = (number) => {
  return number < 10 ? `0` + number : `` + number;
};

export const calculateInterval = (start, end) => {
  const MS_IN_HOUR = 1000 * 60 * 60;
  const MS_IN_MINUTE = 1000 * 60;

  const intervalInMs = end.getTime() - start.getTime();
  const hours = Math.floor(intervalInMs / MS_IN_HOUR);
  const minutes = Math.floor((intervalInMs % MS_IN_HOUR) / MS_IN_MINUTE);

  return {
    hours,
    minutes
  };
};

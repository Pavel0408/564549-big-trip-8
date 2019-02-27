import {
  getRandomNumber
} from './../utilities';
export const gnerateMockDate = () => {
  const maxTimeLength = 24 * 60 * 60 * 1000;
  const MS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
  const msInHour = 60 * 60 * 1000;
  const msInMinute = 60 * 1000;
  const dateNow = new Date();
  const start = new Date(getRandomNumber(+dateNow, +dateNow + MS_IN_WEEK));
  const end = new Date(getRandomNumber(+start, +start + maxTimeLength));

  const intervalInMs = (+end - +start);
  const hours = Math.floor(intervalInMs / msInHour);
  const minutes = Math.floor(intervalInMs % msInHour / msInMinute);
  const interval = {
    hours,
    minutes
  };

  return {
    start,
    end,
    interval
  };
};

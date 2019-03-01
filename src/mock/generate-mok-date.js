import {
  getRandomNumber
} from './../utilities';

export const gnerateMockDate = () => {
  const MAX_TIME_LENGTH = 1000 * 60 * 60 * 24;
  const MS_IN_WEEK = 1000 * 60 * 60 * 24 * 7;
  const MS_IN_HOUR = 1000 * 60 * 60;
  const MS_IN_MINUTE = 60 * 1000;

  const dateNow = new Date();
  const start = new Date(getRandomNumber(+dateNow, +dateNow + MS_IN_WEEK));
  const end = new Date(getRandomNumber(+start, +start + MAX_TIME_LENGTH));

  const intervalInMs = (+end - +start);
  const hours = Math.floor(intervalInMs / MS_IN_HOUR);
  const minutes = Math.floor(intervalInMs % MS_IN_HOUR / MS_IN_MINUTE);
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

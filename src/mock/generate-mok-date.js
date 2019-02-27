import {
  getRandomNumber
} from './../utilities';
export const gnerateMockDate = () => {
  const maxTimeLength = 24 * 60 * 60 * 1000;
  const MS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
  const dateNow = new Date();
  const start = new Date(getRandomNumber(+dateNow, +dateNow + MS_IN_WEEK));
  const end = new Date(getRandomNumber(+start, +start + maxTimeLength));
  const interval = new Date(+end - +start);
  return {
    start,
    end,
    interval
  };
};

import {
  getRandomNumber
} from './../utilities';
export const gnerateMockDate = () => {
  const maxTimeLength = 24 * 60 * 60 * 1000;
  const MS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
  const dateNow = new Date();
  const startTime = new Date(getRandomNumber(+dateNow, +dateNow + MS_IN_WEEK));
  const endTime = new Date(getRandomNumber(+startTime, +startTime + maxTimeLength));
  return {
    startTime,
    endTime
  }
};

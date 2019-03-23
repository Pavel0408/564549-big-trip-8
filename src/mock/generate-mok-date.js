import {
  getRandomNumber
} from '../utilities';

export const gnerateMockDate = () => {
  const MAX_TIME_LENGTH = 1000 * 60 * 60 * 24;
  const MS_IN_WEEK = 1000 * 60 * 60 * 24 * 7;

  const dateNow = new Date();
  const start = new Date(getRandomNumber(dateNow.getTime(), dateNow.getTime() + MS_IN_WEEK));
  const end = new Date(getRandomNumber(start.getTime(), start.getTime() + MAX_TIME_LENGTH));

  return {
    start,
    end,
  };
};

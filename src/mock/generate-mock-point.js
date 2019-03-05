import {
  getRandomValue,
  getFewValues,
  getRandomNumber
} from "../utilities";
import {
  pointsTitles,
  pointsOptions,
  descriptionArr
} from "./mock-constants";
import {
  fenerateOffers
} from "./generate-offers";

import {
  gnerateMockDate
} from "./generate-mok-date";

const MAX_PRICE = 100;
const MIN_PRICE = 10;

export const mockPoint = function () {
  return {
    title: getRandomValue(pointsTitles),
    type: getRandomValue(pointsOptions),
    offers: new Set(fenerateOffers()),
    descrittion: getFewValues(descriptionArr, 1, 3).join(`. `),
    time: gnerateMockDate(),
    price: getRandomNumber(MIN_PRICE, MAX_PRICE)
  };
};

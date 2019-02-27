import {
  getRandomValue,
  getFewValues,
  getRandomNumber
} from "./../utilities";
import {
  mockArrays
} from "./mock-arrays";
import {
  fenerateOffers
} from "./generate-offers";

import {
  gnerateMockDate
} from "./generate-mok-date";

const MAX_PRICE = 100;
const MIN_PRICE = 10;

export const MockPoint = function () {
  this.title = getRandomValue(mockArrays.pointsTitles);
  this.type = getRandomValue(Object.keys(mockArrays.typesOfPoints));
  this.offers = new Set(fenerateOffers());
  this.descrittion = getFewValues(mockArrays.descriptionArr, 1, 3).join(`. `);
  this.time = gnerateMockDate();
  this.price = getRandomNumber(MIN_PRICE, MAX_PRICE);

};

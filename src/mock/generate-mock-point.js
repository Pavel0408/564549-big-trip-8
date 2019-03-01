import {
  getRandomValue,
  getFewValues,
  getRandomNumber
} from "./../utilities";
import {
  pointsTitles,
  typesOfPoints,
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

export const MockPoint = function () {
  this.title = getRandomValue(pointsTitles);
  this.type = getRandomValue(Object.keys(typesOfPoints));
  this.offers = new Set(fenerateOffers());
  this.descrittion = getFewValues(descriptionArr, 1, 3).join(`. `);
  this.time = gnerateMockDate();
  this.price = getRandomNumber(MIN_PRICE, MAX_PRICE);

};

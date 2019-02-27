import {
  getRandomValue,
  getFewValues
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

export const MockPoint = function () {
  this.title = getRandomValue(mockArrays.pointsTitles);
  this.type = getRandomValue(Object.keys(mockArrays.typesOfPoints));
  this.offers = new Set(fenerateOffers());
  this.descrittion = getFewValues(mockArrays.descriptionArr, 1, 3).join(`. `);
  this.time = gnerateMockDate();

};

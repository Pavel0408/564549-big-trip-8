import {
  mockArrays
} from "./mock-arrays";

import {
  getFewValues
} from "./../utilities";

const MAX_OFFERS = 2;
const MIN_OFFERS = 0;

export const fenerateOffers = () => {
  const offers = getFewValues(mockArrays.offers, MIN_OFFERS, MAX_OFFERS);
  offers.forEach((offer, index) => {
    const offerItem = {
      [offer]: 20
    };
    offers[index] = offerItem;
  });
  console.log(offers);
  return offers;
};

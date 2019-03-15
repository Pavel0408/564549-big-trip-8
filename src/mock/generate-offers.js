import {
  offers as offersArray
} from "./mock-constants";

import {
  getFewValues,
  getRandomNumber
} from "../utilities";

const MAX_OFFER_PRICE = 100;
const MAX_OFFERS = 2;
const MIN_OFFER_PRICE = 20;
const MIN_OFFERS = 0;

export const generateOffers = () => {
  const offers = getFewValues(offersArray, MIN_OFFERS, MAX_OFFERS);
  offers.forEach((offer, index) => {
    const offerItem = {
      name: offer,
      price: getRandomNumber(MIN_OFFER_PRICE, MAX_OFFER_PRICE)
    };
    offers[index] = offerItem;
  });

  return offers;
};

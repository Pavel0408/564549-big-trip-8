import {api} from "./backend";
let offers = null;

export const getOffers = () => {
  if (!offers) {
    return api.getOffers().then((offersObj) => {
      offers = offersObj;

      return offers;
    });
  } else {
    return Promise.resolve(true).then(() => {
      return offers;
    });
  }
};

import {api} from "./backend";
let offers = null;

export const getOffers = () => {
  if (!offers) {
    return api.getOffers().then((offersArr) => {
      offers = {};

      offersArr.forEach((offer) => {
        offers[offer.type] = new Set(
            offer.offers.map((element) => {
              return {
                title: element.name,
                price: element.price
              };
            })
        );
      });
      offers.check = offers[`check-in`];

      return offers;
    });
  } else {
    return Promise.resolve(true).then(() => {
      return offers;
    });
  }
};

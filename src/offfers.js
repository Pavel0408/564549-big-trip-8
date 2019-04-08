import {api} from "./backend";
const offers = {};

export const getOffers = () => {
  if (Object.keys(offers).length === 0) {
    return api.getOffers().then((offersArr) => {
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
    return offers;
  }
};

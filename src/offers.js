import {provider} from "./backend";
let offers = null;

export const loadOffers = () => {
  if (!offers) {
    offers = {};
    return provider.getOffers().then((offersItems) => {
      offersItems.forEach((offer) => {
        offers[offer.type] = Array.from(
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
    return Promise.resolve(offers);
  }
};

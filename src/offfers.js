import {api} from "./backend";

export const getOffers = () => {
  const offers = {};
  api.getOffers().then((offersArr) => {
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
  });

  return offers;
};

import {API} from "./api";

const URL = `https://es8-demo-srv.appspot.com/big-trip/`;
const AUTHORIZATION = `Basic eo0w590ik29889aaaa`;
const api = new API({
  endPoint: URL,
  authorization: AUTHORIZATION
});
export const offers = {};

api.getOffers().then((offersArr) => {
  console.log(offersArr);
  offersArr.forEach((offer) => {
    console.log(offer);
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

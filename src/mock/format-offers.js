export const formatOffers = (offers) => {
  let offersStr = ``;
  offers.forEach((offer) => {
    offersStr += `<li>
    <button class="trip-point__offer">${offer.title} +&euro;&nbsp;${offer.price}</button>
  </li>`;
  });
  return offersStr;
};

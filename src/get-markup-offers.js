export const getMarkupOffers = (offers) => {
  let offersStr = ``;

  if (offers.forEach) {
    offers.forEach((offer) => {
      offersStr += `<li>
    <button class="trip-point__offer">${offer.title} +&euro;&nbsp;${
  offer.price
}</button>
  </li>`;
    });
  }

  return offersStr;
};

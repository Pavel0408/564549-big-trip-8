export const getMarkupOffers = (offers) => {
  let offersStr = ``;

  if (offers.forEach) {
    offers.forEach((offer, index) => {
      offersStr += `<li>
    <button class="trip-point__offer" data-id=${index}>${offer.title} +&euro;&nbsp;${
  offer.price
}</button>
  </li>`;
    });
  }

  return offersStr;
};

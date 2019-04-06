export const formatOffers = (offers) => {
  let offersStr = ``;
  let offersCount = 0;

  if (offers && offers.size > 0) {
    offers.forEach((offer) => {

      if (offersCount < 2) {
        offersStr += `<li>
    <button class="trip-point__offer">${offer.title} +&euro;&nbsp;${offer.price}</button>
  </li>`;
        offersCount++;
      }
    });
  }

  return offersStr;
};

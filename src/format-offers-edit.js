export const formatOffersEdit = (offers) => {
  let offersStr = ``;

  if (offers && offers.size > 0) {
    offers.forEach((offer) => {
      offersStr += ` <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.title}" name="${offer.title}" value="${offer.title}" ${offer.accepted ? `checked` : ``}>
    <label for="${offer.title}" class="point__offers-label">
      <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
    </label>`;
    });
  }

  return offersStr;
};

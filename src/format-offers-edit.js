export const formatOffersEdit = (offers) => {
  let offersStr = ``;
  offers.forEach((offer) => {
    offersStr += ` <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.name}" name="${offer.name}" value="${offer.name}">
    <label for="${offer.name}" class="point__offers-label">
      <span class="point__offer-service">${offer.name}</span> + €<span class="point__offer-price">${offer.price}</span>
    </label>`;
  });

  return offersStr;
};

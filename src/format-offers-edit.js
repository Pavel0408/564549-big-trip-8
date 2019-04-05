export const formatOffersEdit = (offers) => {
  let offersStr = ``;
  offers.forEach((offer) => {
    console.log(offer.title);
    offersStr += ` <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.title}" name="${offer.title}" value="${offer.title}">
    <label for="${offer.title}" class="point__offers-label">
      <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
    </label>`;
  });

  return offersStr;
};

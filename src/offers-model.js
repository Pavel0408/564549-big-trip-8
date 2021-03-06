export default class OffersModel {
  constructor(data) {
    this._type = data[`type`];
    this._offers = data[`offers`].map((it) => {
      return {
        name: it[`name`],
        price: it[`price`]
      };
    });
  }

  get type() {
    return this._type;
  }

  get offers() {
    return this._offers;
  }

  static parseOffers(offersItems) {
    const offers = offersItems.map(OffersModel.parseOffer);

    return offers;
  }

  static parseOffer(offer) {
    return new OffersModel(offer);
  }
}

export class OffersModel {
  constructor(data) {
    this._type = data[`type`];
    this._offers = data[`offers`];
  }

  get type() {
    return this._type;
  }

  get offers() {
    return this._offers;
  }

  static parseServerData(offersArr) {
    const offers = offersArr.map(OffersModel.parseOffer);

    return offers;
  }

  static parseOffer(offer) {
    return new OffersModel(offer);
  }
}

export class Point {
  constructor(data) {
    this._title = data.title;
    this._type = data.type;
    this._offers = data.offers;
    this._description = data.description;
    this._time = data.time;
    this._price = data.price;
    this._element = null;
  }
}

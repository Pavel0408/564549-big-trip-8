import Component from "./component";

export default class AbstractPoint extends Component {
  constructor(data) {
    super();

    if (new.target === AbstractPoint) {
      throw new Error(`Can't instantiate AbstractPoint, only concrete one.`);
    }

    this._destination = data.destination;
    this._type = data.type;
    this._time = data.time;
    this._price = data.price;
  }

  get time() {
    return this._time;
  }

  update(data) {
    this._destination = data.destination;
    this._type = data.type;
    this._time = data.time;
    this._price = data.price;
  }
}

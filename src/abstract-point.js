import {
  Component
} from "./component";

export class AbstractPoint extends Component {
  constructor() {
    super();

    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }
  update(data) {
    this._destination = data.destination;
    this._type = data.type;
    this._time = data.time;
    this._price = data.price;
  }
}

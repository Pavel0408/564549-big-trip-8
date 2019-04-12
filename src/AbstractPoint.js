import {Component} from "./component";

export class AbstractPoint extends Component {
  constructor(data) {
    super();

    this._destination = data.destination;
    this._type = data.type;
    this._time = data.time;
    this._price = data.price;
  }

  update(data) {
    this._destination = data.destination;
    this._type = data.type;
    this._time = data.time;
    this._price = data.price;
  }
}

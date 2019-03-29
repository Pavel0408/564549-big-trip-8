import {
  Component
} from "./component";

export class ComponentPoint extends Component {
  constructor() {
    super();

    if (new.target === ComponentPoint) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }

  get time() {
    return this._time;
  }

  get type() {
    return this._type;
  }

  get price() {
    return this._price;
  }

  render() {
    const fragment = document.createElement(`div`);
    fragment.innerHTML = this.template;
    this._element = fragment.firstChild;
    this._installHandlers();

    return this._element;
  }

  update(data) {
    this._destination = data.destination;
    this._type = data.type;
    this._time = data.time;
    this._price = data.price;
  }
}

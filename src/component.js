export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  get element() {
    return this._element;
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  get price() {
    return this._price;
  }

  set id(id) {
    this._id = id;
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

  _unrender() {
    this._element.remove();
  }

  _installHandlers() {}
}

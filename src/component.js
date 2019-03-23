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

  render() {
    const fragment = document.createElement(`div`);
    fragment.innerHTML = this.template;
    this._element = fragment.firstChild;
    this._installHandlers();

    return this._element;
  }

  update(data) {
    this._destination = data.destination;
    this._type = data.type || this._type;
    this._time = data.time;
    this._price = data.price;
  }

  _unrender() {
    this._element.remove();
  }

  _installHandlers() {}
}
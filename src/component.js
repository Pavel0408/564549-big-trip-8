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

  _unrender() {
    this._element.remove();
  }

  _installHandlers() {
    throw new Error(`You cannot install handlers until you create a point`);
  }
}

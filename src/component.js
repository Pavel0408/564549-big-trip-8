export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only extends one.`);
    }
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  render() {
    const fragment = document.createElement(`div`);
    fragment.innerHTML = this.template;
    this._element = fragment.firstChild;
    this._installHandlers();

    return this._element;
  }

  update() {}

  _elementRemove() {
    this._element.remove();
  }

  _installHandlers() {}
}

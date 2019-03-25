import {
  Component
} from "./component";

export class Filter extends Component {
  constructor(name) {
    super();

    this._name = name;
    this._pointsArr = null;
    // this._function = filterFunctions[name];
    this._elment = null;
  }

  get template() {
    return `<input type="radio" id="filter-${this._name}" name="filter" value="${this._name}">
    <label class="trip-filter__item" for="filter-${this._name}">${this._name}</label>`;
  }

  render() {
    const fragment = document.createElement(`div`);
    fragment.innerHTML = this.template;
    this._element = fragment.childNodes;
    // this._installHandlers();

    return this._element;
  }
}

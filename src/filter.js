import {
  Component
} from "./component";

import {
  filterFunctions
} from "./filter-functions";

import {
  getPointsArr
} from "./get-points-arr";

export class Filter extends Component {
  constructor(name) {
    super();

    this._name = name;
    this._pointsArr = null;
    this._function = filterFunctions[name];
    this._elment = null;
    this._changeHandler = this._changeHandler.bind(this);
    this._renderPoints = null;
  }

  get template() {
    return `<input type="radio" id="filter-${this._name}" name="filter" value="${this._name}">
    <label class="trip-filter__item" for="filter-${this._name}">${this._name}</label>`;
  }

  render() {
    const fragment = document.createElement(`div`);
    fragment.innerHTML = this.template;

    this._element = fragment.childNodes;
    this._installHandler();

    return this._element;
  }

  set renderPoints(fn) {
    this._renderPoints = fn;
  }

  _filterArr() {
    return getPointsArr().filter(this._function);
  }

  _changeHandler() {
    this._renderPoints(this._filterArr());
  }

  _installHandler() {
    const input = this._element[0];
    input.addEventListener(`change`, this._changeHandler);
  }

}

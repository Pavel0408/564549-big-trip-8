import {Component} from "./component";

import {getPoints} from "./points";

import {renderPoints} from "./render-points";

const points = getPoints();

export class Filter extends Component {
  constructor(name) {
    super();

    this._name = name;
    this._pointsArr = null;
    this._filterPoints = FilterByName[name];
    this._elment = null;
    this._changeHandler = this._changeHandler.bind(this);
  }

  get template() {
    return `<input type="radio" id="filter-${
      this._name
    }" name="filter" value="${this._name}">
    <label class="trip-filter__item" for="filter-${this._name}">${
  this._name
}</label>`;
  }

  render() {
    const fragment = document.createElement(`div`);
    fragment.innerHTML = this.template;

    this._element = fragment.childNodes;
    this._installHandler();

    return this._element;
  }

  _filterArr() {
    return points
      .filter((item) => {
        return item && item.point;
      })
      .filter((item) => this._filterPoints(new Date(), item));
  }

  _changeHandler() {
    renderPoints(this._filterArr());
  }

  _installHandler() {
    const input = this._element[0];
    input.addEventListener(`change`, this._changeHandler);
  }
}

export const filterName = {
  EVRYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

const FilterByName = {
  [filterName.EVRYTHING]: () => {
    return true;
  },
  [filterName.FUTURE]: (now, item) => {
    return now < item.point.time.start;
  },
  [filterName.PAST]: (now, item) => {
    return now > item.point.time.end;
  }
};

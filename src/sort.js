import {getPoints} from "./points";
import {renderPoints} from "./render-points";

export class Sort {
  constructor(name) {
    this._name = name;
    this._pointsArr = null;
    this._elment = null;
    this._sortPoints = sortByName[name];
    this._changeHandler = this._changeHandler.bind(this);
  }

  get template() {
    return `<input type="radio" name="trip-sorting" id="sorting-${
      this._name
    }" value="${this._name}">
    <label class="trip-sorting__item trip-sorting__item--${
  this._name
}" for="sorting-${this._name}">${this._name}</label>`;
  }

  render() {
    const fragment = document.createElement(`div`);
    fragment.innerHTML = this.template;

    this._element = fragment.childNodes;
    this._installHandler();

    return this._element;
  }

  _sortArr() {
    const points = getPoints();
    return points
      .filter((item) => {
        return item && item.point;
      })
      .sort(this._sortPoints);
  }

  _changeHandler() {
    renderPoints(this._sortArr());
  }

  _installHandler() {
    const input = this._element[0];
    input.addEventListener(`change`, this._changeHandler);
  }
}

export const sortName = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const sortByName = {
  [sortName.EVENT]: () => {
    return 0;
  },

  [sortName.TIME]: (a, b) => {
    const firstDuration = a.point._time.end - a.point._time.start;
    const secondDuration = b.point._time.end - b.point._time.start;
    return secondDuration - firstDuration;
  },

  [sortName.PRICE]: (a, b) => {
    return b.point._price - a.point._price;
  }
};

import {state} from "./state";

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

  _sortArr(points) {
    const newPoints = points
      .filter((item) => {
        return item && item.point;
      })
      .sort(this._sortPoints);
    return newPoints;
  }

  _changeHandler() {
    state.sort = this;
    state.render();
    // renderPoints(this._sortArr());
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
    const firstDuration = a.point.time.end - a.point.time.start;
    const secondDuration = b.point.time.end - b.point.time.start;
    return secondDuration - firstDuration;
  },

  [sortName.PRICE]: (a, b) => {
    return b.point.price - a.point.price;
  }
};

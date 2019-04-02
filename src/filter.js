import {
  Component
} from "./component";

import {
  points
} from "./points";

import {
  renderPoints
} from "./render-points";

export class Filter extends Component {
  constructor(name) {
    super();

    this._name = name;
    this._pointsArr = null;
    this._filterPoints = filterByName[name];
    this._elment = null;
    this._changeHandler = this._changeHandler.bind(this);
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

  _filterArr() {
    return points.filter((item) => {
      return item && item.point;
    }).filter((item) => this._filterPoints(new Date(), item));
  }

  _changeHandler() {
    renderPoints(this._filterArr());
  }

  _installHandler() {
    const input = this._element[0];
    input.addEventListener(`change`, this._changeHandler);
  }
}

export const filterNames = [
  `everything`,
  `future`,
  `past`
];

const filterEnum = {
  everything: () => {
    return true;
  },

  future: (now, item) => {
    return now < item.point.time.start;
  },

  past: (now, item) => {
    return now > item.point.time.end;
  }
};

const filterByName = {
  everything: filterEnum.everything,
  future: filterEnum.future,
  past: filterEnum.past
};

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
    this._filterFunction = filterFunctions[name];
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
    return points.filter((item)=>{
      return item && item.point;
    }).filter(this._filterFunction);
  }

  _changeHandler() {
    renderPoints(this._filterArr());
  }

  _installHandler() {
    const input = this._element[0];
    input.addEventListener(`change`, this._changeHandler);
  }
}

const filterFunctions = {
  everything() {
    return true;
  },

  future(item) {
    const now = new Date();
    return now < item.point.time.start;
  },

  past(item) {
    const now = new Date();
    return now > item.point.time.end;
  }
};

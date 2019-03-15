import {
  pointsIcons
} from "./mock/mock-constants";

import {
  formatOffers
} from "./mock/format-offers";

import {
  addLeadingZero
} from "./utilities";

export class Point {
  constructor(data) {
    this._title = data.title;
    this._type = data.type;
    this._offers = data.offers;
    this._description = data.description;
    this._time = data.time;
    this._price = data.price;
    this._element = null;
    this._editHandler = null;
  }

  get element() {
    return this._element;
  }

  get template() {
    return `<article class="trip-point">
    <i class="trip-icon">${pointsIcons[this._type]}</i>
    <h3 class="trip-point__title">${this._title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${ addLeadingZero(this._time.start.getHours())}:${addLeadingZero(this._time.start.getMinutes())}&nbsp;&mdash;${addLeadingZero(this._time.end.getHours())}:${addLeadingZero(this._time.end.getMinutes())}</span>
      <span class="trip-point__duration">${this._time.interval.hours}h ${this._time.interval.minutes}m</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
    <ul class="trip-point__offers">
      ${formatOffers(this._offers)}
    </ul>
  </article>`;
  }

  set editHandler(fn) {
    const handler = function (evt) {
      evt.preventDefault();
      fn();
    };
    this._editHandler = handler;
  }

  render() {
    const fragment = document.createElement(`div`);
    fragment.innerHTML = this.template;
    this._element = fragment.firstChild;
    this._installHandlers();

    return this._element;
  }

  unrender() {
    this._element = null;
  }

  _installHandlers() {
    this._element.querySelector(`.trip-point__title`).addEventListener(`click`, this._editHandler);
  }
}

import {pointsIcons, pointsTexts} from "./constants";

import {getMarkupOffers} from "./get-markup-offers";

import {addLeadingZero, calculateInterval} from "./utilities";

import {AbstractPoint} from "./abstract-point";

export class Point extends AbstractPoint {
  constructor(data) {
    super();

    this._title = data.title;
    this._type = data.type;
    this._offers = data.offers;
    this._description = data.description;
    this._time = data.time;
    this._price = data.price;
    this._element = null;
    this._editHandler = null;
    this._id = data.id;
    this._isFavorite = data.isFavorite;
    this._destination = data.destination;
  }

  get template() {
    const interval = calculateInterval(this._time.start, this._time.end);

    return `<article class="trip-point">
    <i class="trip-icon">${pointsIcons[this._type]}</i>
    <h3 class="trip-point__title">${pointsTexts[this._type]} ${
  this._destination
}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${addLeadingZero(
      this._time.start.getHours()
  )}:${addLeadingZero(
    this._time.start.getMinutes()
)}&nbsp;&mdash;${addLeadingZero(
    this._time.end.getHours()
)}:${addLeadingZero(this._time.end.getMinutes())}</span>
      <span class="trip-point__duration">${interval.hours}h ${
  interval.minutes
}m</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
    <ul class="trip-point__offers">
      ${getMarkupOffers(this._offers)}
    </ul>
  </article>`;
  }

  get time() {
    return this._time;
  }

  get type() {
    return this._type;
  }

  get price() {
    return this._price;
  }

  set editHandler(fn) {
    const handler = function (evt) {
      evt.preventDefault();
      fn();
    };

    this._editHandler = handler;
  }

  _installHandlers() {
    this._element
      .querySelector(`.trip-point__title`)
      .addEventListener(`click`, this._editHandler);
  }

  static parseServerData(data) {
    return {
      title: data.destination.name,
      type: data.type === `check-in` ? `check` : data.type,
      offers: new Set(data.offers),
      description: data.destination.description,
      time: {
        start: new Date(data.date_from),
        end: new Date(data.date_to)
      },
      price: data.base_price,
      images: data.destination.pictures,
      destination: data.destination.name,
      id: data.id,
      isFavorite: data.is_favorite,
      destinations: data.destinations
    };
  }

  static parseData(serverData) {
    return serverData.map(Point.parseServerData);
  }
}

import {
  mockArrays
} from "./mock/mock-arrays";

import {
  formatOffers
} from "./mock/format-offers";

import {
  firstZero
} from "./utilities";

export default (point) => {
  return `<article class="trip-point">
  <i class="trip-icon">${mockArrays.typesOfPoints[point.type]}</i>
  <h3 class="trip-point__title">${point.title}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${ firstZero(point.time.start.getHours())}:${firstZero(point.time.start.getMinutes())}&nbsp;&mdash;${firstZero(point.time.end.getHours())}:${firstZero(point.time.end.getMinutes())}</span>
    <span class="trip-point__duration">${point.time.interval.hours}h ${point.time.interval.minutes}m</span>
  </p>
  <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
  <ul class="trip-point__offers">
    ${formatOffers(point.offers)}
  </ul>
</article>`;
};

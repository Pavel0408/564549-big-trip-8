import {
  mockArrays
} from "./mock/mock-arrays";

import {
  formatOffers
} from "./mock/format-offers";

export default (point) => {
  return `<article class="trip-point">
  <i class="trip-icon">${mockArrays.typesOfPoints[point.type]}</i>
  <h3 class="trip-point__title">${point.title}</h3>
  <p class="trip-point__schedule">
    <span class="trip-point__timetable">${point.time.start.getHours()}:${point.time.start.getMinutes()}&nbsp;&mdash;${point.time.end.getHours()}:${point.time.end.getMinutes()}</span>
    <span class="trip-point__duration">${point.time.interval.getHours()}h ${point.time.interval.getMinutes()}m</span>
  </p>
  <p class="trip-point__price">&euro;&nbsp;${point.price}</p>
  <ul class="trip-point__offers">
    ${formatOffers(point.offers)}
  </ul>
</article>`;
};

import generateFilter from "./generate-filter";

import {
  getRandomNumber
} from "./utilities";

import generateTripPoint from "./generate-trip-point";

import {
  generatePointsArr
} from "./mock/generate-points-array";

export const filterNames = [
  `everything`,
  `future`,
  `past`
];

const MAX_NUMBER_POINTS = 10;
const MIN_NUMBER_POINTS = 1;
const START_NUMBER_POINTS = 7;

const renderFilters = (filterNamesArr) => {
  const formTripFilter = document.querySelector(`.trip-filter`);
  let fragment = ``;
  filterNamesArr.forEach((filterName) => {
    fragment += generateFilter(filterName);
  });
  formTripFilter.innerHTML = fragment;
};

const renderTripPoints = (numberTripPoints) => {
  const tripDayItems = document.querySelector(`.trip-day__items`);
  const pointsArr = generatePointsArr(numberTripPoints);
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < numberTripPoints; i++) {
    fragment.appendChild(generateTripPoint(pointsArr[i]));
  }
  tripDayItems.appendChild(fragment);
};

const filterClickHandler = (evt) => {
  const filter = evt.target.closest(`.trip-filter__item`);
  if (filter) {
    renderTripPoints(getRandomNumber(MIN_NUMBER_POINTS, MAX_NUMBER_POINTS));
  }
};

renderFilters(filterNames);
renderTripPoints(START_NUMBER_POINTS);

document.body.addEventListener(`click`, filterClickHandler);

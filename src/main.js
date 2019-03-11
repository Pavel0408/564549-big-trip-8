import generateFilter from "./generate-filter";

import {
  getRandomNumber
} from "./utilities";

import {
  generateTripPoint
} from "./generate-trip-point";

import {
  generatePointsArr
} from "./mock/generate-points-array";

import {
  Point
} from "./point";

import {
  PointEdit
} from "./point-edit";

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
  const pointsArr = generatePointsArr(numberTripPoints)
    .map((mockPointDate) => {
      const pointItem = new Point(mockPointDate);
      const pointEditItem = new PointEdit(mockPointDate);

      return {
        point: pointItem,
        pointEdit: pointEditItem
      };
    });
  generateTripPoint(pointsArr, tripDayItems);
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

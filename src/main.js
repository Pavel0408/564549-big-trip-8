import {
  filterNames,
  generateFilter
} from "./generate-filter";

import {
  getRandomNumber
} from "./utilities";

import generateTripPoint from "./generate-trip-point";

const maxNumberPoints = 10;
const minNumberPoints = 1;
const startNumberPoints = 7;

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
  let fragment = ``;
  for (let i = 0; i < numberTripPoints; i++) {
    fragment += generateTripPoint();
  }
  tripDayItems.innerHTML = fragment;
};

const filterClickHandler = (evt) => {
  const filter = evt.target.closest(`.trip-filter__item`);
  if (filter) {
    renderTripPoints(getRandomNumber(minNumberPoints, maxNumberPoints));
  }
};

renderFilters(filterNames);
renderTripPoints(startNumberPoints);

document.body.addEventListener(`click`, filterClickHandler);

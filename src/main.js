import {
  filterNames,
  generateFilter
} from "./generate-filter";

import generateTripPoint from "./generate-trip-point";

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

renderFilters(filterNames);
renderTripPoints(startNumberPoints);

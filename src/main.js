import {
  Filter,
  filterNames
} from "./filter";

import {
  showStats
} from "./stats";

import {
  renderPoints
} from "./render-points";

import {
  points
} from "./points";

const renderFilters = (filterNamesArr) => {
  const formTripFilter = document.querySelector(`.trip-filter`);
  let fragment = document.createDocumentFragment();

  filterNamesArr.forEach((filterName) => {
    const filterItem = new Filter(filterName);
    filterItem.render().forEach((element) => {
      fragment.appendChild(element);
    });
  });

  formTripFilter.appendChild(fragment);
};

let startId = 0;

points.forEach((pointItem) => {
  pointItem.pointEdit.id = startId;
  startId++;
});

const switchesArr = document.querySelectorAll(`.view-switch__item`);
const [tableButton, statsButton] = switchesArr;
const pointsContainer = document.querySelector(`.trip-points`);
const statsContainer = document.querySelector(`.statistic`);

const tableClickHandler = (evt) => {
  evt.preventDefault();

  pointsContainer.classList.remove(`visually-hidden`);
  statsContainer.classList.add(`visually-hidden`);
  tableButton.classList.add(`view-switch__item--active`);
  statsButton.classList.remove(`view-switch__item--active`);
};

const statsClickHandler = (evt) => {
  evt.preventDefault();

  pointsContainer.classList.add(`visually-hidden`);
  statsContainer.classList.remove(`visually-hidden`);
  tableButton.classList.remove(`view-switch__item--active`);
  statsButton.classList.add(`view-switch__item--active`);

  showStats();
};

renderFilters(filterNames);
renderPoints(points);

document.querySelector(`#filter-everything`).setAttribute(`checked`, `checked`);

tableButton.addEventListener(`click`, tableClickHandler);
statsButton.addEventListener(`click`, statsClickHandler);

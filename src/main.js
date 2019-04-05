// test
import {
  Filter,
  filterName
} from "./filter";

import {
  Stats
} from "./stats";

import {
  renderPoints
} from "./render-points";

import {
  getPoints
} from "./points";

import {
  getDestinations
} from "./format-destinations-names";

const renderFilters = () => {
  const formTripFilter = document.querySelector(`.trip-filter`);
  let fragment = document.createDocumentFragment();
  new Filter(filterName.EVRYTHING).render().forEach((elem) => {
    fragment.appendChild(elem);
  });
  new Filter(filterName.FUTURE).render().forEach((elem) => {
    fragment.appendChild(elem);
  });
  new Filter(filterName.PAST).render().forEach((elem) => {
    fragment.appendChild(elem);
  });

  formTripFilter.appendChild(fragment);
};

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

  new Stats().render();
};

renderFilters();
getPoints();
getDestinations();

document.querySelector(`#filter-everything`).setAttribute(`checked`, `checked`);

tableButton.addEventListener(`click`, tableClickHandler);
statsButton.addEventListener(`click`, statsClickHandler);

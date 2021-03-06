import Filter from "./filter";

import {Stats} from "./stats";
import {state} from "./state";
import {setHandler} from "./set-handlers";

import {loadPoints, getPoints} from "./points";

import {loadDestinations} from "./destinations";
import {provider} from "./backend";
import Sort from "./sort";

import Point from "./point";
import PointEdit from "./point-edit";

import {generateNewPointData} from "./new-point";
import {FilterNames, SortNames} from "./constants";
import {loadOffers} from "./offers";

const ESC_KEY_CODE = 27;

const switches = document.querySelectorAll(`.view-switch__item`);
const [tableButton, statsButton] = switches;
const pointsContainer = document.querySelector(`.trip-points`);
const statsContainer = document.querySelector(`.statistic`);
const tripDayItems = document.querySelector(`.trip-day__items`);
const newPointButton = document.querySelector(`.new-event`);

const renderFilters = () => {
  const formTripFilter = document.querySelector(`.trip-filter`);
  let fragment = document.createDocumentFragment();
  const filterEverything = new Filter(FilterNames.EVERYTHING);
  state.filter = filterEverything;
  filterEverything.render().forEach((element) => {
    fragment.appendChild(element);
  });
  new Filter(FilterNames.FUTURE).render().forEach((element) => {
    fragment.appendChild(element);
  });
  new Filter(FilterNames.PAST).render().forEach((element) => {
    fragment.appendChild(element);
  });

  formTripFilter.appendChild(fragment);
};

const renderSort = () => {
  const formSort = document.querySelector(`.trip-sorting`);
  const sortLabel = document.querySelector(`.trip-sorting__item`);
  let fragment = document.createDocumentFragment();
  const sortEvent = new Sort(SortNames.EVENT);
  state.sort = sortEvent;
  sortEvent.render().forEach((element) => {
    fragment.appendChild(element);
  });
  new Sort(SortNames.TIME).render().forEach((element) => {
    fragment.appendChild(element);
  });

  new Sort(SortNames.PRICE).render().forEach((element) => {
    fragment.appendChild(element);
  });

  formSort.insertBefore(fragment, sortLabel);
};

const newButtonClickHandler = () => {
  const tripDayItem = document.querySelector(`.trip-day__items`);
  const points = getPoints();
  const newItem = {
    point: new Point(generateNewPointData()),
    pointEdit: new PointEdit(generateNewPointData())
  };

  setHandler(newItem, tripDayItem);
  points.push(newItem);

  points[points.length - 1].pointEdit.index = points.length - 1;

  tripDayItem.insertBefore(
      points[points.length - 1].pointEdit.render(),
      tripDayItem.firstChild
  );
};

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

const escPressHandler = (evt) => {
  if (evt.keyCode === ESC_KEY_CODE) {
    state.render();
  }
};

renderFilters();
renderSort();

tripDayItems.textContent = `Loading route...`;

loadDestinations()
  .then(loadOffers)
  .then(loadPoints)
  .then(() => {
    state.render();
  })
  .catch(() => {
    tripDayItems.textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
  });

document.querySelector(`#filter-everything`).setAttribute(`checked`, `checked`);
document.querySelector(`#sorting-event`).setAttribute(`checked`, `checked`);

newPointButton.addEventListener(`click`, newButtonClickHandler);

tableButton.addEventListener(`click`, tableClickHandler);
statsButton.addEventListener(`click`, statsClickHandler);
document.addEventListener(`keydown`, escPressHandler);

window.addEventListener(
    `offline`,
    () => (document.title = `${document.title}[OFFLINE]`)
);

window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider
    .syncPoints()
    .then(() => {
      provider.storageClear();
    })
    .then(loadDestinations)
    .then(loadOffers)
    .then(loadPoints)
    .then(() => {
      state.render();
    });
});

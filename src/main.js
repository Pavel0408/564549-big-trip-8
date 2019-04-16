import {Filter, filterName} from "./filter";

import {Stats} from "./stats";
import {state} from "./state";
import {renderPoints, submitHandlers, submitHandler} from "./render-points";

import {getPointsFromServer, getPoints} from "./points";

import {getDestinationsFromServer} from "./destinations";
import {provider} from "./backend";
import {Sort, sortName} from "./sort";

import {Point} from "./point";
import {PointEdit} from "./point-edit";
import {pointsTexts} from "./constants";
import {generateNewPointData} from "./new-point";

const renderFilters = () => {
  const formTripFilter = document.querySelector(`.trip-filter`);
  let fragment = document.createDocumentFragment();
  const filterEvtything = new Filter(filterName.EVRYTHING);
  state.filter = filterEvtything;
  filterEvtything.render().forEach((elem) => {
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

const renderSort = () => {
  const formSort = document.querySelector(`.trip-sorting`);
  const sortLabel = document.querySelector(`.trip-sorting__item`);
  let fragment = document.createDocumentFragment();
  const sortEvent = new Sort(sortName.EVENT);
  state.sort = sortEvent;
  sortEvent.render().forEach((elem) => {
    fragment.appendChild(elem);
  });
  new Sort(sortName.TIME).render().forEach((elem) => {
    fragment.appendChild(elem);
  });

  new Sort(sortName.PRICE).render().forEach((elem) => {
    fragment.appendChild(elem);
  });

  formSort.insertBefore(fragment, sortLabel);
};

const newButtonClickHandler = () => {
  const tripDayItems = document.querySelector(`.trip-day__items`);
  // const newPoint = new PointNew();
  const points = getPoints();
  const newItem = {
    point: new Point(generateNewPointData()),
    pointEdit: new PointEdit(generateNewPointData())
  };

  submitHandler(newItem);

  points.push(newItem);


  console.log(points.length - 1);
  tripDayItems.insertBefore(
      points[points.length - 1].pointEdit.render(),
      tripDayItems.firstChild
  );
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
renderSort();

const tripDayItems = document.querySelector(`.trip-day__items`);
tripDayItems.textContent = `Loading route...`;

getDestinationsFromServer()
  .then(getPointsFromServer)
  .then(submitHandlers)
  .then((points) => {
    console.log(points);
    state.render();
  })
  .catch((e) => {
    console.log(e);
    tripDayItems.textContent = `Something went wrong while loading your route info. Check your connection or try again later`;
  });

document.querySelector(`#filter-everything`).setAttribute(`checked`, `checked`);
document.querySelector(`#sorting-event`).setAttribute(`checked`, `checked`);

const newPointButton = document.querySelector(`.new-event`);
newPointButton.addEventListener(`click`, newButtonClickHandler);

tableButton.addEventListener(`click`, tableClickHandler);
statsButton.addEventListener(`click`, statsClickHandler);

window.addEventListener(
    `offline`,
    () => (document.title = `${document.title}[OFFLINE]`)
);
window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncPoints().then(getPointsFromServer).then(submitHandlers).then((points) => {
    console.log(points);
    state.render();
  });
});

import {
  generatePointsArr
} from "./mock/generate-points-array";

import {
  Point
} from "./point";

import {
  PointEdit
} from "./point-edit";

import {
  pointsById
} from "./points-by-id";

import {
  Filter
} from "./filter";

import {
  stats
} from "./stats";

export const filterNames = [
  `everything`,
  `future`,
  `past`
];


const START_NUMBER_POINTS = 7;

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

const generateTripPoints = (numberTripPoints) => {
  const pointsArr = generatePointsArr(numberTripPoints)
    .map((mockPointDate) => {
      const pointItem = new Point(mockPointDate);
      const pointEditItem = new PointEdit(mockPointDate);
      const points = {
        point: pointItem,
        pointEdit: pointEditItem
      };

      pointsById.add(points);

      return points;
    });

  return pointsArr;
};

const pointsArr = generateTripPoints(START_NUMBER_POINTS);

const renderPoints = (tripsArr) => {
  const tripDayItems = document.querySelector(`.trip-day__items`);
  tripDayItems.innerHTML = ``;
  tripsArr.forEach((points) => {
    points.point.editHandler = () => {
      points.pointEdit.render();
      tripDayItems.replaceChild(points.pointEdit.element, points.point.element);
    };

    points.pointEdit.submitHandler = () => {
      const formData = new FormData(points.pointEdit._element.querySelector(`form`));
      const entry = generateEntry(formData);
      entry.time = generateDate(formData);

      points.point.update(entry);
      points.pointEdit.update(entry);

      points.point.render();

      tripDayItems.replaceChild(points.point.element, points.pointEdit.element);
    };

    tripDayItems.appendChild(points.point.render());
  });
};

const switchsArr = document.querySelectorAll(`.view-switch__item`);
const [tableButton, statsButton] = switchsArr;
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

  stats();
};

renderFilters(filterNames);
renderPoints(pointsArr);

document.querySelector(`#filter-everything`).setAttribute(`checked`, `checked`);

tableButton.addEventListener(`click`, tableClickHandler);
statsButton.addEventListener(`click`, statsClickHandler);


const generateEntry = (formData) => {
  return {
    destination: formData.get(`destination`),
    price: formData.get(`price`),
    type: formData.get(`travel-way`)
  };
};

const generateDate = (formData) => {
  const day = formData.get(`day`);

  // Устанавливаем в start текущую дату
  let start = new Date();

  // Проверяем, есть ли значение в поле выбора даты
  if (day) {

    // Если значение есть устанавливаем в start его
    start = new Date(day);
  }

  // Приравниваем end к start (предположим, что событие началось и закончилось в один день)
  const end = new Date(start);

  // Устанавливаем время
  const startTime = parseTimeValue(formData.get(`first-time`));
  const endTime = parseTimeValue(formData.get(`second-time`));

  start.setHours(startTime.hours, startTime.minutes);
  end.setHours(endTime.hours, endTime.minutes);

  // Проверяем не получилось ли окончание события раньше начала. Такое может быть, если время события пересекает полночь например 23:00 - 01:00, и если это произошло, то добавляем в end 1 день.
  if (end.getTime() < start.getTime()) {
    end.setDate(end.getDate() + 1);
  }

  return {
    start,
    end
  };
};

const parseTimeValue = (value) => {
  const valueArr = value.split(`:`).map((timeString) => {
    return parseInt(timeString, 10);
  });
  const [hours, minutes] = valueArr;

  return {
    hours,
    minutes
  };
};

export {
  renderPoints
};

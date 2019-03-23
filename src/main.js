import generateFilter from "./generate-filter";

import {
  getRandomNumber
} from "./utilities";

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

  pointsArr.forEach((points) => {
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

const filterClickHandler = (evt) => {
  const filter = evt.target.closest(`.trip-filter__item`);
  if (filter) {
    renderTripPoints(getRandomNumber(MIN_NUMBER_POINTS, MAX_NUMBER_POINTS));
  }
};

renderFilters(filterNames);
renderTripPoints(START_NUMBER_POINTS);

document.body.addEventListener(`click`, filterClickHandler);

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

  // Разбираем значение поля выбора диапазона времени
  const time = parseTime(formData);

  // Устанавливаем время
  start.setHours(time.startTime.hours, time.startTime.minutes);
  end.setHours(time.endTme.hours, time.endTime.minutes);

  // Проверяем не получилось ли окончание события раньше начала. Такое может быть, если время события пересекает полночь например 23:00 - 01:00, и если это произошло, то добавляем в end 1 день.
  if (end.getTime() < start.getTime()) {
    end.setDate(end.getDate() + 1);
  }

  return {
    start,
    end
  };
};

const parseTime = (formData) => {
  const value = formData.get(`time`);
  const valueArr = value.split(`—`).map((values) => {
    return parseTimeValue(values);
  });

  const [startTime, endTime] = valueArr;

  return {
    startTime,
    endTime
  };
};

const parseTimeValue = (value) => {
  const valueArr = value.split(`:`);
  const [hours, minutes] = valueArr;
  hours = parseInt(hours, 10);
  minutes = parseInt(minutes, 10);
  return {
    hours,
    minutes
  };
};

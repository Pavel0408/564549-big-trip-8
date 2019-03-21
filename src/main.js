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
      entry.time = instalDate(formData);

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

const instalDate = (formData) => {
  const MS_IN_HOUR = 1000 * 60 * 60;
  const MS_IN_MINUTE = 1000 * 60;
  const day = formData.get(`day`);
  let start = new Date();
  if (day) {
    start = new Date(formData.get(`day`));
  }

  const end = new Date(start);
  const time = parseTime(formData);
  start.setHours(time.startHours, time.startMinutes);
  end.setHours(time.endHours, time.endMinutes);

  if (end.getTime() < start.getTime()) {
    end.setDate(end.getDate() + 1);
  }

  const intervalInMs = (end.getTime() - start.getTime());
  const hours = Math.floor(intervalInMs / MS_IN_HOUR);
  const minutes = Math.floor(intervalInMs % MS_IN_HOUR / MS_IN_MINUTE);

  const interval = {
    hours,
    minutes
  };

  return {
    start,
    end,
    interval
  };
};

const parseTime = (formData) => {
  const value = formData.get(`time`);
  const valueArr = value.split(`—`);
  let [startTime, endTime] = valueArr;
  startTime = startTime.split(`:`);
  endTime = endTime.split(`:`);
  let [startHours, startMinutes] = startTime;
  let [endHours, endMinutes] = endTime;

  startHours = parseInt(startHours, 10);
  startMinutes = parseInt(startMinutes, 10);
  endHours = parseInt(endHours, 10);
  endMinutes = parseInt(endMinutes, 10);

  return {
    startHours,
    startMinutes,
    endHours,
    endMinutes
  };
};

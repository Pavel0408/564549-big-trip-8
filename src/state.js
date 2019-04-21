import {cost} from "./cost";
import {generateDays} from "./generate-days";
import {setHandlers} from "./set-handlers";

class State {
  constructor() {
    this._filter = null;
    this._sort = null;
  }

  set filter(filter) {
    this._filter = filter;
  }

  set sort(sort) {
    this._sort = sort;
  }

  render() {
    const changeState = () => {
      let points = this._filter._filterArr();
      points = this._sort._sortArr(points);
      const days = generateDays(points);
      const dayContainer = document.querySelector(`.trip-points`);
      dayContainer.innerHTML = ``;
      let fragment = document.createDocumentFragment();

      days.forEach((day) => {
        const dayFragment = document.createDocumentFragment();
        dayFragment.appendChild(day.render());

        const tripDayItems = dayFragment.querySelector(`.trip-day__items`);
        const dayPoints = this._sort._sortArr(day.points);
        dayPoints.forEach((it) => {
          if (
            (it.point.price !== 0 && !it.point.price) ||
            !it.point._destination
          ) {
            it = null;
            return;
          }
          setHandlers(day.points, tripDayItems);
          tripDayItems.appendChild(it.point.render());
        });

        fragment.appendChild(dayFragment);
      });

      dayContainer.appendChild(fragment);

      cost.render();
    };
    changeState();
  }
}

export const state = new State();

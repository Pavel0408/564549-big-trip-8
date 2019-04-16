import {renderPoints} from "./render-points";

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
    console.log(this);
    let points = this._filter._filterArr();
    points = this._sort._sortArr(points);

    const tripDayItems = document.querySelector(`.trip-day__items`);
    tripDayItems.innerHTML = ``;
    let fragment = document.createDocumentFragment();
    points.forEach((it) =>{
      fragment.appendChild(it.point.render());
    });
    tripDayItems.appendChild(fragment);
  }
}

export const state = new State();

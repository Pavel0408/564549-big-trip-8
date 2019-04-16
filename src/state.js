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
    let points = this._filter._filterArr();
    points = this._sort._sortArr(points);

    renderPoints(points);
  }
}

export const state = new State();

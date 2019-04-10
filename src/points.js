import {Point} from "./point";

import {PointEdit} from "./point-edit";

import {api} from "./backend";

let points = [];

export const getPointsFromServer = () => {
  return api.getPoints().then((pointsItems) => {
    points = [];
    points = pointsItems.map((date) => {
      const pointItem = new Point(date);
      const pointEditItem = new PointEdit(date);
      const pointElement = {
        point: pointItem,
        pointEdit: pointEditItem
      };
      return pointElement;
    });
    console.log(points);
    return points;
  });
};

export const getPoints = () => {
  return points;
};

import {Point} from "./point";

import {PointEdit} from "./point-edit";

import {api} from "./backend";

let points = [];

export const getPointsFromServer = () => {
  return api.getPoints().then((pointsItems) => {
    points = pointsItems.map((date) => {
      return {
        point: new Point(date),
        pointEdit: new PointEdit(date)
      };
    });

    return points;
  });
};

export const getPoints = () => {
  return points;
};

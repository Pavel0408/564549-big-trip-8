import {Point} from "./point";

import {PointEdit} from "./point-edit";

import {api} from "./backend";

let points = [];

export const getPointsFromServer = () => {
  return api.getPoints().then((pointsItems) => {
    points = pointsItems.map((date, index) => {
      const pointsElement = {
        point: new Point(date),
        pointEdit: new PointEdit(date)
      };
      pointsElement.pointEdit.index = index;

      return pointsElement;
    });

    return points;
  });
};

export const getPoints = () => {
  return points;
};

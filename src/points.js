import {Point} from "./point";

import {PointEdit} from "./point-edit";

import {api} from "./backend";

let points = [];

export const getPointsFromServer = () => {
  points = [];

  return api.getPoints().then((pointsItems) => {
    pointsItems.forEach((date) => {
      const pointItem = new Point(date);
      const pointEditItem = new PointEdit(date);
      const pointElement = {
        point: pointItem,
        pointEdit: pointEditItem
      };
      points[parseInt(pointElement.point._id, 10)] = pointElement;
    });

    return points;
  });
};

export const getPoints = () => {
  return points;
};

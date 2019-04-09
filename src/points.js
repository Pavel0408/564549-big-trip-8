import {Point} from "./point";

import {PointEdit} from "./point-edit";

import {api} from "./backend";

const points = [];

export const getPoints = (server) => {
  let pointsLoaded = false;
  if (server) {
    points.length = 0;
    pointsLoaded = true;
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
  } else if (points.length === 0 && !pointsLoaded) {
    pointsLoaded = true;
    getPoints(true);
  }

  return points;
};

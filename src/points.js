import {Point} from "./point";

import {PointEdit} from "./point-edit";

import {api} from "./backend";

const points = [];

const getPoints = (server) => {
  if (server) {
    points.length = 0;
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
  } else {
    return points;
  }
};

export {getPoints};

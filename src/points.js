import { generatePointsArr } from "./mock/generate-points-array";

import { Point } from "./point";

import { PointEdit } from "./point-edit";

import { API } from "./api";

import { renderPoints } from "./render-points";

const URL = `https://es8-demo-srv.appspot.com/big-trip/`;
const AUTHORIZATION = `Basic eo0w590ik29889aaaa`;
const api = new API({
  endPoint: URL,
  authorization: AUTHORIZATION
});

const points = [];

const getPoints = () => {
  api
    .getTask()
    .then((pointsItems) => {
      pointsItems.forEach((date) => {
        const pointItem = new Point(date);
        const pointEditItem = new PointEdit(date);
        const pointElement = {
          point: pointItem,
          pointEdit: pointEditItem
        };
        points[pointElement.point._id] = pointElement;
      });
      return points;
    })

    .then(renderPoints);
};

export { points, getPoints };

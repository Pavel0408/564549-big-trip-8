import {
  generatePointsArr
} from "./mock/generate-points-array";

import {
  Point
} from "./point";

import {
  PointEdit
} from "./point-edit";

const START_NUMBER_POINTS = 7;

const generateTripPoints = (numberTripPoints) => {
  const pointsArr = generatePointsArr(numberTripPoints)
    .map((mockPointDate) => {
      const pointItem = new Point(mockPointDate);
      const pointEditItem = new PointEdit(mockPointDate);
      const pointElement = {
        point: pointItem,
        pointEdit: pointEditItem
      };
      pointElement.pointEdit.item = pointEditItem;

      return pointElement;
    });

  return pointsArr;
};

export const points = generateTripPoints(START_NUMBER_POINTS);

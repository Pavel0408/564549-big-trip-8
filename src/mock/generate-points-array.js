import {
  MockPoint
} from "./generate-mock-point";

export const generatePointsArr = (pointsNumber) => {
  const pointsArr = [];
  for (let i = 0; i < pointsNumber; i++) {
    const point = new MockPoint();
    pointsArr.push(point);
  }
  return pointsArr;
}

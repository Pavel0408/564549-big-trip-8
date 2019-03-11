import {
  generateMockPoint
} from "./generate-mock-point";

export const generatePointsArr = (pointsNumber) => {

  return new Array(pointsNumber)
  .fill(``)
  .map(generateMockPoint);
};

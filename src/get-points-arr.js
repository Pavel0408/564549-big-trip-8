import {
  pointsById
} from "./points-by-id";

export const getPointsArr = () => Object.keys(pointsById)
  .filter((number) => {
    return (pointsById[number] && pointsById[number].point && pointsById[number].pointEdit);
  })
  .map((number) => {
    return pointsById[number];
  });

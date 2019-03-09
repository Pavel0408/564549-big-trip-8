import {
  pointsIcons
} from "./mock/mock-constants";

import {
  formatOffers
} from "./mock/format-offers";

import {
  addLeadingZero
} from "./utilities";

export const generateTripPoint = (arr, container) => {
  const fragment = document.createDocumentFragment();
  arr.forEach((points) => {
    container.appendChild(points.point.render());
    points.point.editHandler = function () {
      points.pointEdit.render();
      container.replaceChild(points.pointEdit.element, points.point.element);
    };
    points.point.bind();
  });

};

export const generateTripPoint = (arr, container) => {
  arr.forEach((points) => {

    points.point.editHandler = function () {
      points.pointEdit.render();
      container.replaceChild(points.pointEdit.element, points.point.element);
    };

    points.pointEdit.submitHandler = function () {
      points.point.render();
      container.replaceChild(points.point.element, points.pointEdit.element);
    };
    container.appendChild(points.point.render());
  });

};

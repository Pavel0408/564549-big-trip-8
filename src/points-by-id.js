export const pointsById = {
  newIndex: 1,
  add(points) {
    this[this.newIndex] = points;

    this[this.newIndex].point.id = this.newIndex;

    this.newIndex++;
  }
};

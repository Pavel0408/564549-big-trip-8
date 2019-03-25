export const pointsById = {
  newIndex: 0,
  add(points) {
    this[this.newIndex] = points;

    this[this.newIndex].point.id = this.newIndex;
    this[this.newIndex].pointEdit.id = this.newIndex;

    this.newIndex++;
  }
};

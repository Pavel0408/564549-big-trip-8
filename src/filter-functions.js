export const filterFunctions = {
  everything() {
    return true;
  },

  future(item) {
    const now = new Date();
    return now < item.point._time.start;
  },

  past(item) {
    const now = new Date();
    return now > item.point._time.end;
  }
};

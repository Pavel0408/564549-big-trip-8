export const filterNames = [
  `everything`,
  `future`,
  `past`
];

export const generateFilter = (filterName) => {
  return `<input type="radio" id="filter-${filterName}" name="filter" value="${filterName}">
  <label class="trip-filter__item" for="filter-${filterName}">${filterName}</label>`;
};

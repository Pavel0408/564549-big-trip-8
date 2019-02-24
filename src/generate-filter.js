export const filterNames = [
  `everything`,
  `Future`,
  `Past`
];

export const generateFilter = (filterName) => {
  return `<input type="radio" id="filter-${filterName}" name="filter" value="${filterName}">
  <label class="trip-filter__item" for="filter-${filterName}">${filterName}</label>`;
};

export const filterNames = [
  `everything`,
  `Future`,
  `Past`
];

export const generateFilter = (filterName) => {
  return `<form class="trip-filter">
  <input type="radio" id="filter-${filterName}" name="filter" value="${filterName}">
  <label class="trip-filter__item" for="filter-${filterName}">${filterName}</label>`;
};

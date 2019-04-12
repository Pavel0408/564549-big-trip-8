export const getMarkupDestinations = (names) => {
  const destinationsOptions = names.map((name) => {
    return `<option value="${name}"></option>`;
  });

  return destinationsOptions;
};

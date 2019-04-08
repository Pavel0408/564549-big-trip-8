import { api } from "./backend";

export const getDestinations = () => {
  let destinations = {};
  let destinationsNames;

  return api.getDestinations().then((data) => {
    destinationsNames = data.map((destination) => {
      destinations[destination.name] = destination;
      return destination.name;
    });
    return {
      destinations,
      destinationsNames
    };
  });

};

export const formatDestinationsNames = (names) => {
  const destinationsOptions = names.map((name) => {
    return `<option value="${name}"></option>`;
  });

  return destinationsOptions;
};



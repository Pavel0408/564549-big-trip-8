import {api} from "./backend";

let destinations = {};
let destinationsNames;

export const getDestinations = () => {
  return api.getDestinations().then((data) => {
    destinationsNames = data.map((destination) => {
      destinations[destination.name] = destination;
      return destination.name;
    });
  });
};

export const formatDestinationsNames = (names) => {
  const destinationsOptions = names.map((name) => {
    return `<option value="${name}"></option>`;
  });

  return destinationsOptions;
};

export {destinations, destinationsNames};

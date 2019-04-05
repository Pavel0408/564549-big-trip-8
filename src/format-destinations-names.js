import {api} from "./backend";

let destinations = {};
let destinationsNames;

export const getDestinations = () => {
  api.getDestinations().then((data) => {
    console.log(data);
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

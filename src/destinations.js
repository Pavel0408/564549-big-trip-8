import {api} from "./backend";
let destinations = null;

export const getDestinationsFromServer = () => {
  return api.getDestinations().then((destinationsArr) => {
    destinations = {};

    destinations.names = destinationsArr.map((destination) => {
      destinations[destination.name] = destination;
      return destination.name;
    });

    return destinations;
  });
};

export const getDestinations = () => {
  return destinations;
};

import {provider} from "./backend";
let destinations = null;

export const loadDestinations = () => {
  return provider.getDestinations().then((destinationsItems) => {
    destinations = {};

    destinations.names = destinationsItems.map((destination) => {
      destinations[destination.name] = destination;
      return destination.name;
    });

    return destinations;
  });
};

export const getDestinations = () => {
  return destinations;
};

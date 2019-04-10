import {api} from "./backend";
let destinations = null;

export const getDestinationsFromServer = () => {
  return api.getDestinations().then((destinationsObj) => {
    destinations = destinationsObj;

    return destinations;
  });
};

export const getDestinations = () => {
  return destinations;
};

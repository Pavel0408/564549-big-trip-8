import {
  API
} from "./api";
const URL = `https://es8-demo-srv.appspot.com/big-trip/`;
const AUTHORIZATION = `Basic eo0w590ik29889aaaa`;


const api = new API({
  endPoint: URL,
  authorization: AUTHORIZATION
});

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

  console.log(destinations);
};

export const formatDestinationsNames = (names) => {
  const destinationsOptions = names.map((name) => {
    return `<option value="${name}"></option>`;
  });

  return destinationsOptions;
};

export {
  destinations,
  destinationsNames
};

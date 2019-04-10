export const parseDestinations = (destinationsArr) => {
  const destinations = {};

  destinations.names = destinationsArr.map((destination) => {
    destinations[destination[`name`]] = destination;
    return destination[`name`];
  });

  return destinations;
};

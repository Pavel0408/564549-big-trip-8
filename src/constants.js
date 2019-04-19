export const pointEvents = {
  transportTypes: [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`
  ],

  stopTypes: [`check`, `sightseeing`, `restaurant`]
};

export const pointsOptions = [
  ...pointEvents.transportTypes,
  ...pointEvents.stopTypes
];

export const pointsIcons = {
  taxi: `🚕`,
  bus: `🚌`,
  train: `🚂`,
  ship: `🛳️`,
  transport: `🚊`,
  drive: `🚗`,
  flight: `✈️`,
  check: `🏨`,
  sightseeing: `🏛️`,
  restaurant: `🍴`
};

export const pointsTexts = {
  taxi: `Taxi to`,
  bus: `Bus to`,
  train: `Train to`,
  ship: `Ship to`,
  transport: `Transport to`,
  drive: `Drive to`,
  flight: `Flight to`,
  check: `Check into`,
  sightseeing: `go to`,
  restaurant: `go to`
};

export const filterNames = {
  EVRYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const sortNames = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

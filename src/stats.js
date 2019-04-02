import {
  points
} from "./points";

import {
  pointsIcons
} from "./mock/mock-constants";

import {
  renderTransportStats,
  renderMoneyStats
} from "./render-stats";

import {
  PointEvents
} from "./mock/mock-constants";

export const showStats = () => {
  const statsСontainer = document.querySelector(`#stats`);
  statsСontainer.innerHTML = `<div class="statistic__item statistic__item--money">
  <canvas class="statistic__money" width="900"></canvas>
</div>

<div class="statistic__item statistic__item--transport">
  <canvas class="statistic__transport" width="900"></canvas>
</div>

<div class="statistic__item statistic__item--time-spend">
  <canvas class="statistic__time-spend" width="900"></canvas>
</div>`;

  const transportTypes = PointEvents.transportTypes;

  const transportSet = new Set();
  points.filter((item) => {
    return item && item.point;
  }).forEach((pointsItem) => {
    if (transportTypes.indexOf(pointsItem.point.type) !== -1) {
      transportSet.add(pointsItem.point.type);
    }
  });

  const generateLabelsArr = (set) => {
    const labelsArr = [...set].map((type) => {
      return `${pointsIcons[type]} ${type.toUpperCase()}`;
    });

    return labelsArr;
  };

  const transportLabels = generateLabelsArr(transportSet);

  const transportData = [...transportSet].map((type) => {
    let totalTransportEvents = 0;
    points.filter((item) => {
      return item && item.point;
    }).forEach((pointsItem) => {
      if (pointsItem.point.type === type) {
        totalTransportEvents++;
      }
    });
    return totalTransportEvents;
  });

  const moneySet = new Set();
  points.filter((item) => {
    return item && item.point;
  }).forEach((pointsItem) => {
    moneySet.add(pointsItem.point.type);
  });

  const moneyData = [...moneySet].map((type) => {
    let eventTotalCost = 0;
    points.filter((item) => {
      return item && item.point;
    }).forEach((pointsItem) => {
      if (pointsItem.point.type === type) {
        eventTotalCost += pointsItem.point.price;
      }
    });

    return eventTotalCost;
  });

  const monyLabels = generateLabelsArr(moneySet);

  renderMoneyStats(monyLabels, moneyData);
  renderTransportStats(transportLabels, transportData);
};

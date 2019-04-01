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
  pointsOptions
} from "./mock/mock-constants";

export const stats = () => {
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

  const transportTypes = pointsOptions.slice(0, 7);

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
    let totalСostType = 0;
    points.filter((item) => {
      return item && item.point;
    }).forEach((pointsItem) => {
      if (pointsItem.point.type === type) {
        totalСostType++;
      }
    });
    return totalСostType;
  });

  const moneySet = new Set();
  points.filter((item) => {
    return item && item.point;
  }).forEach((pointsItem) => {
    moneySet.add(pointsItem.point.type);
  });

  const moneyData = [...moneySet].map((type) => {
    let typeMoney = 0;
    points.filter((item) => {
      return item && item.point;
    }).forEach((pointsItem) => {
      if (pointsItem.point.type === type) {
        typeMoney += pointsItem.point.price;
      }
    });

    return typeMoney;
  });

  const monyLabels = generateLabelsArr(moneySet);

  renderMoneyStats(monyLabels, moneyData);
  renderTransportStats(transportLabels, transportData);
};

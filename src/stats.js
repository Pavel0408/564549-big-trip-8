import {
  points
} from "./main";

import {
  pointsIcons
} from "./mock/mock-constants";

import {
  renderTransportStats,
  renderMoneyStats
} from "./render-stats";

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

  const transportTypes = [
    `taxi`,
    `bus`,
    `train`,
    `ship`,
    `transport`,
    `drive`,
    `flight`
  ];

  const transportSet = new Set();
  points.filter((item)=>{
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

  const transportLabelsArr = generateLabelsArr(transportSet);

  const transportDataArr = [...transportSet].map((type) => {
    let typeCount = 0;
    points.filter((item)=>{
      return item && item.point;
    }).forEach((pointsItem) => {
      if (pointsItem.point.type === type) {
        typeCount++;
      }
    });
    return typeCount;
  });


  const moneySet = new Set();
  points.filter((item)=>{
    return item && item.point;
  }).forEach((pointsItem) => {
    moneySet.add(pointsItem.point.type);
  });

  const moneyDataArr = [...moneySet].map((type) => {
    let typeMoney = 0;
    points.filter((item)=>{
      return item && item.point;
    }).forEach((pointsItem) => {
      if (pointsItem.point.type === type) {
        typeMoney += pointsItem.point.price;
      }
    });

    return typeMoney;
  });

  const monyLabeslArr = generateLabelsArr(moneySet);

  renderMoneyStats(monyLabeslArr, moneyDataArr);
  renderTransportStats(transportLabelsArr, transportDataArr);
};

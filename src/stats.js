import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  getPoints
} from "./get-points-arr";

import {
  pointsIcons
} from "./mock/mock-constants";

export const stats = () => {
  const moneyCtx = document.querySelector(`.statistic__money`);
  const transportCtx = document.querySelector(`.statistic__transport`);
  const timeSpendCtx = document.querySelector(`.statistic__time-spend`);

  const pointArr = getPoints();

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
  pointArr.forEach((points) => {
    if (transportTypes.indexOf(points.point.type) !== -1) {
      transportSet.add(points.point.type);
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
    pointArr.forEach((points) => {
      if (points.point.type === type) {
        typeCount++;
      }
    });
    return typeCount;
  });

  const moneySet = new Set();
  pointArr.forEach((points) => {
    moneySet.add(points.point.type);
  });

  const moneyDataArr = [...moneySet].map((type) => {
    let typeMoney = 0;
    pointArr.forEach((points) => {
      if (points.point.type === type) {
        typeMoney += points.point.price;
      }
    });

    return typeMoney;
  });

  const monyLabeslArr = generateLabelsArr(moneySet);

  // Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
  const BAR_HEIGHT = 55;
  moneyCtx.height = BAR_HEIGHT * 6;
  transportCtx.height = BAR_HEIGHT * 4;
  timeSpendCtx.height = BAR_HEIGHT * 4;

  // eslint-disable-next-line no-unused-vars
  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: monyLabeslArr,
      datasets: [{
        data: moneyDataArr,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  const transportChart = new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: transportLabelsArr,
      datasets: [{
        data: transportDataArr,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

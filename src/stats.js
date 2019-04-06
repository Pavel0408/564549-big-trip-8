import {points} from "./points";

import {pointsIcons} from "./mock/mock-constants";

import {renderTransportStats, renderMoneyStats} from "./render-stats";

import {PointEvents} from "./mock/mock-constants";

import {Component} from "./component";

export class Stats extends Component {
  constructor() {
    super();

    this._statsСontainer = document.querySelector(`#stats`);

    this._transportSet = new Set();
    points
      .filter((item) => {
        return item && item.point;
      })
      .forEach((pointsItem) => {
        if (PointEvents.transportTypes.indexOf(pointsItem.point.type) !== -1) {
          this._transportSet.add(pointsItem.point.type);
        }
      });

    this._transportLabels = this._generateLabelsArr(this._transportSet);

    this._transportData = [...this._transportSet].map((type) => {
      let totalTransportEvents = 0;
      points
        .filter((item) => {
          return item && item.point;
        })
        .forEach((pointsItem) => {
          if (pointsItem.point.type === type) {
            totalTransportEvents++;
          }
        });
      return totalTransportEvents;
    });

    this._moneySet = new Set();
    points
      .filter((item) => {
        return item && item.point;
      })
      .forEach((pointsItem) => {
        this._moneySet.add(pointsItem.point.type);
      });

    this._moneyData = [...this._moneySet].map((type) => {
      let eventTotalCost = 0;
      points
        .filter((item) => {
          return item && item.point;
        })
        .forEach((pointsItem) => {
          if (pointsItem.point.type === type) {
            eventTotalCost += parseInt(pointsItem.point.price, 10);
          }
        });

      return eventTotalCost;
    });

    this._moneyLabels = this._generateLabelsArr(this._moneySet);
  }

  get template() {
    return `<div class="statistic__item statistic__item--money">
    <canvas class="statistic__money" width="900"></canvas>
  </div>

  <div class="statistic__item statistic__item--transport">
    <canvas class="statistic__transport" width="900"></canvas>
  </div>

  <div class="statistic__item statistic__item--time-spend">
    <canvas class="statistic__time-spend" width="900"></canvas>
  </div>`;
  }

  render() {
    this._statsСontainer.innerHTML = this.template;

    renderMoneyStats(this._moneyLabels, this._moneyData);
    renderTransportStats(this._transportLabels, this._transportData);
  }

  _generateLabelsArr(set) {
    const labelsArr = [...set].map((type) => {
      return `${pointsIcons[type]} ${type.toUpperCase()}`;
    });

    return labelsArr;
  }
}

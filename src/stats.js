import {getPoints} from "./points";

import {pointsIcons} from "./constants";

import {
  renderTransportStats,
  renderMoneyStats,
  renderTimeStats
} from "./render-stats";

import {pointEvents} from "./constants";

import Component from "./component";

const MS_IN_HOUR = 60 * 60 * 1000;

export class Stats extends Component {
  constructor() {
    super();

    this._statsContainer = document.querySelector(`#stats`);
    this._points = getPoints();

    this._transportSet = new Set();
    this._points
      .filter((item) => {
        return item && item.point;
      })
      .forEach((pointsItem) => {
        if (pointEvents.transportTypes.indexOf(pointsItem.point.type) !== -1) {
          this._transportSet.add(pointsItem.point.type);
        }
      });

    this._transportLabels = this._generateLabels(this._transportSet);

    this._transportData = [...this._transportSet].map((type) => {
      let totalTransportEvents = 0;
      this._points
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
    this._points
      .filter((item) => {
        return item && item.point;
      })
      .forEach((pointsItem) => {
        this._moneySet.add(pointsItem.point.type);
      });

    this._moneyData = [...this._moneySet].map((type) => {
      let eventTotalCost = 0;
      this._points
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

    this._timeData = [...this._moneySet].map((type) => {
      let eventTotalTime = 0;
      this._points
        .filter((item) => {
          return item && item.point;
        })
        .forEach((pointsItem) => {
          if (pointsItem.point.type === type) {
            eventTotalTime +=
              pointsItem.point.time.end - pointsItem.point.time.start;
          }
        });

      return Math.floor(eventTotalTime / MS_IN_HOUR);
    });

    this._moneyLabels = this._generateLabels(this._moneySet);
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
    this._statsContainer.innerHTML = this.template;
    renderMoneyStats(this._moneyLabels, this._moneyData);
    renderTransportStats(this._transportLabels, this._transportData);
    renderTimeStats(this._moneyLabels, this._timeData);
  }

  _generateLabels(set) {
    const labels = [...set].map((type) => {
      return `${pointsIcons[type]} ${type.toUpperCase()}`;
    });

    return labels;
  }
}

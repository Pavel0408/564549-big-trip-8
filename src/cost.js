import Component from "./component";
import {getPoints} from "./points";

class Cost extends Component {
  constructor() {
    super();
    this._totalCost = 0;
  }

  _calculate() {
    const points = getPoints();
    this._totalCost = points.reduce((accumulator, it) => {
      if (it && it.point.price) {
        return accumulator + parseInt(it.point.price, 10);
      }
      return accumulator;
    }, 0);
  }

  render() {
    this._calculate();
    const totalCost = document.querySelector(`.trip__total-cost`);
    totalCost.textContent = `€ ${this._totalCost}`;
  }
}

export const cost = new Cost();

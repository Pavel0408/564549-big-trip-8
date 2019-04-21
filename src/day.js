import Component from "./component";

const dateFormatter = new Intl.DateTimeFormat(`en-US`, {
  day: `numeric`
});
const monthFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `short`
});

export default class Day extends Component {
  constructor(day, points) {
    super();

    this._points = points;
    this._day = day;
    this._number = ``;
  }

  get template() {
    return `<section class="trip-day">
   <article class="trip-day__info">
     <span class="trip-day__caption">Day</span>
     <p class="trip-day__number">${this._number}</p>
     <h2 class="trip-day__title">${monthFormatter.format(
      this._day
  )} ${dateFormatter.format(this._day)}</h2>
   </article>
   <div class="trip-day__items">
   </div>
</section>`;
  }

  get points() {
    return this._points;
  }

  set points(points) {
    this._points = points;
  }

  set number(number) {
    this._number = number;
  }

  get day() {
    return this._day;
  }
}

import {
  pointsIcons,
  pointsTexts
} from "./mock/mock-constants";

import {
  addLeadingZero
} from "./utilities";

import {
  formatOffersEdit
} from "./format-offers-edit";

import {
  Component
} from "./component";

import {
  points
} from "./main";

const flatpickr = require(`flatpickr`);

const dateFormatter = new Intl.DateTimeFormat(`en-US`, {
  day: `numeric`
});
const monthFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `short`
});

export class PointEdit extends Component {
  constructor(data) {
    super();

    this._title = data.title;
    this._type = data.type;
    this._offers = data.offers;
    this._description = data.description;
    this._time = data.time;
    this._price = data.price;
    this._element = null;
    this._submitHandler = null;
    this._resetHandler = this._resetHandler.bind(this);
    this._images = data.images;
    this._destination = data.destination;
    this._item = null;
  }

  get template() {
    return `<article class="point">
    <form action="" method="get">
      <header class="point__header">
        <label class="point__date">
          choose day
          <input class="point__input" type="text" placeholder="${monthFormatter.format(this._time.start)} ${dateFormatter.format(this._time.start)}" name="day" value = "${monthFormatter.format(this._time.start)} ${dateFormatter.format(this._time.start)}">
        </label>
        <div class="travel-way">
          <label class="travel-way__label" for="travel-way__toggle">${pointsIcons[this._type]}</label>
          <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
          <div class="travel-way__select">
            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi" ${this._type === `taxi` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-taxi">${pointsIcons.taxi} taxi</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus"  ${this._type === `bus` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-bus">${pointsIcons.bus} bus</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train" ${this._type === `train` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-train">${pointsIcons.train} train</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="flight" ${this._type === `flight` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-flight">${pointsIcons.flight} flight</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-transport" name="travel-way" value="transport" ${this._type === `transport` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-transport">${pointsIcons.transport}  transport</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-drive" name="travel-way" value="drive" ${this._type === `drive` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-drive">${pointsIcons.drive} drive</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-ship" name="travel-way" value="ship" ${this._type === `ship` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-ship">${pointsIcons.ship} ship</label>
            </div>

            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check" ${this._type === `check` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-check-in">${pointsIcons.check} check-in</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sightseeing" ${this._type === `sightseeing` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-sightseeing">${pointsIcons.sightseeing} sightseeing</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-restaurant" name="travel-way" value="restaurant" ${this._type === `restaurant` ? `checked` : ``}>
              <label class="travel-way__select-label" for="travel-way-restaurant">${pointsIcons.restaurant} restaurant</label>
            </div>
          </div>
        </div>
        <div class="point__destination-wrap">
          <label class="point__destination-label" for="destination">${pointsTexts[this._type]}</label>
          <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
          <datalist id="destination-select">
            <option value="airport"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="hotel"></option>
          </datalist>
        </div>

        <div class="point__time">
          choose time
          <input class="point__input" type="text" value="${ addLeadingZero(this._time.start.getHours())}:${addLeadingZero(this._time.start.getMinutes())}" name="first-time" placeholder="${ addLeadingZero(this._time.start.getHours())}:${addLeadingZero(this._time.start.getMinutes())}">
          <input class="point__input" type="text" value="${addLeadingZero(this._time.end.getHours())}:${addLeadingZero(this._time.end.getMinutes())}" name="second-time" placeholder="${addLeadingZero(this._time.end.getHours())}:${addLeadingZero(this._time.end.getMinutes())}">
        </div>

        <label class="point__price">
          write price
          <span class="point__price-currency">€</span>
          <input class="point__input" type="text" value="${this._price}" name="price">
        </label>
        <div class="point__buttons">
          <button class="point__button point__button--save" type="submit">Save</button>
          <button class="point__button" type="reset">Delete</button>
        </div>
        <div class="paint__favorite-wrap">
          <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
          <label class="point__favorite" for="favorite">favorite</label>
        </div>
      </header>
      <section class="point__details">
        <section class="point__offers ${this._offers.size > 0 ? `` : `visually-hidden`}">
          <h3 class="point__details-title">offers</h3>
          <div class="point__offers-wrap">
          ${formatOffersEdit(this._offers)}
          </div>
        </section>
        <section class="point__destination">
          <h3 class="point__details-title">Destination</h3>
          <p class="point__destination-text">${this._description}</p>
          <div class="point__destination-images">
            ${this._images.join(` `)}
          </div>
        </section>
        <input type="hidden" class="point__total-price" name="total-price" value="">
      </section>
    </form>
  </article>`;
  }

  set submitHandler(fn) {
    const handler = function (evt) {
      evt.preventDefault();
      fn(evt);
    };

    this._submitHandler = handler;
  }

  set(id) {
    this._id = id;
  }

  update(data) {
    this._destination = data.destination;
    this._type = data.type;
    this._time = data.time;
    this._price = data.price;
  }

  _resetHandler(evt) {
    evt.preventDefault();
    points.splice(this.id, 1);
    this._unrender();
  }

  _changeIconHandler() {
    const type = this._element.querySelector(`.travel-way__select-input:checked`);
    const icon = this._element.querySelector(`.travel-way__label`);

    icon.textContent = pointsIcons[type.value];
  }

  _installHandlers() {
    const form = this._element.querySelector(`.point form`);
    form.addEventListener(`submit`, this._submitHandler);
    form.addEventListener(`reset`, this._resetHandler);

    flatpickr(this._element.querySelector(`.point__input`), {
      altInput: true,
      altFormat: `M j`,
      dateFormat: `M j`
    });

    flatpickr(this._element.querySelector(`input[name=first-time]`), {
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `H:i`,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      defaultDate: this._time.start
    });

    flatpickr(this._element.querySelector(`input[name=second-time]`), {
      enableTime: true,
      noCalendar: true,
      altInput: true,
      altFormat: `H:i`,
      dateFormat: `H:i`,
      // eslint-disable-next-line camelcase
      time_24hr: true,
      defaultDate: this._time.end
    });

    this._element.querySelectorAll(`.travel-way__select-input`).forEach((option) => {
      option.addEventListener(`change`, () => {
        this._changeIconHandler();
      });
    });

    this._element.querySelector(`.point__date`).style.display = `inline`;
  }
}

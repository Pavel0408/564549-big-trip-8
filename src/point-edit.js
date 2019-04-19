import {pointsIcons, pointsTexts} from "./constants";

import {addLeadingZero} from "./utilities";

import {getMarkupOffersEdit} from "./get-markup-offers-edit";

import {getMarkupDestinations} from "./get-markup-destinations";

import {getMarkupImages} from "./get-markup-images";

import {getOffers} from "./offfers";

import {provider} from "./backend";

import {getDestinations} from "./destinations";

import {getPoints} from "./points";

import AbstractPoint from "./abstract-point";
import {cost} from "./cost";

const flatpickr = require(`flatpickr`);

const dateFormatter = new Intl.DateTimeFormat(`en-US`, {
  day: `numeric`
});
const monthFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `short`
});

export default class PointEdit extends AbstractPoint {
  constructor(data) {
    super({
      price: data.price,
      time: data.time,
      type: data.type,
      destination: data.destination
    });

    this._title = data.title;
    this._offers = data.offers;
    this._description = data.description;
    this._element = null;
    this._submitHandler = null;
    this._resetHandler = this._resetHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._images = data.images;
    this._id = data.id;
    this._isFavorite = data.isFavorite;
    this._index = ``;
    this._changeFavoritHandelr = this._changeFavoritHandelr.bind(this);
    this._changeOffersHandler = this._changeOffersHandler.bind(this);
  }

  get template() {
    const destinations = getDestinations();
    const destinationsOptions = getMarkupDestinations(destinations.names);
    const pictures = getMarkupImages(this._images);

    return `<article class="point">
    <form action="" method="get">
      <header class="point__header">
        <label class="point__date">
          choose day
          <input class="point__input" type="text" placeholder="${monthFormatter.format(
      this._time.start
  )} ${dateFormatter.format(
    this._time.start
)}" name="day" value = "${monthFormatter.format(
    this._time.start
)} ${dateFormatter.format(this._time.start)}">
        </label>
        <div class="travel-way">
          <label class="travel-way__label" for="travel-way__toggle">${
  pointsIcons[this._type]
}</label>
          <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
          <div class="travel-way__select">
            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi" ${
  this._type === `taxi` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-taxi">${
  pointsIcons.taxi
} taxi</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus"  ${
  this._type === `bus` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-bus">${
  pointsIcons.bus
} bus</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train" ${
  this._type === `train` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-train">${
  pointsIcons.train
} train</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="flight" ${
  this._type === `flight` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-flight">${
  pointsIcons.flight
} flight</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-transport" name="travel-way" value="transport" ${
  this._type === `transport` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-transport">${
  pointsIcons.transport
}  transport</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-drive" name="travel-way" value="drive" ${
  this._type === `drive` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-drive">${
  pointsIcons.drive
} drive</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-ship" name="travel-way" value="ship" ${
  this._type === `ship` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-ship">${
  pointsIcons.ship
} ship</label>
            </div>

            <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check" ${
  this._type === `check` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-check-in">${
  pointsIcons.check
} check-in</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sightseeing" ${
  this._type === `sightseeing` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-sightseeing">${
  pointsIcons.sightseeing
} sightseeing</label>

              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-restaurant" name="travel-way" value="restaurant" ${
  this._type === `restaurant` ? `checked` : ``
}>
              <label class="travel-way__select-label" for="travel-way-restaurant">${
  pointsIcons.restaurant
} restaurant</label>
            </div>
          </div>
        </div>
        <div class="point__destination-wrap">
          <label class="point__destination-label" for="destination">${
  pointsTexts[this._type]
}</label>
          <input list="destination-list" class="point__destination-input"  id="destination" value="${
  this._destination
}" name="destination" data-id="${this._id}" required>
          <datalist id="destination-list">
            ${destinationsOptions}
          </datalist>
        </div>

        <div class="point__time">
          choose time
          <input class="point__input" type="text" value="${addLeadingZero(
      this._time.start.getHours()
  )}:${addLeadingZero(
    this._time.start.getMinutes()
)}" name="first-time" placeholder="${addLeadingZero(
    this._time.start.getHours()
)}:${addLeadingZero(this._time.start.getMinutes())}">
          <input class="point__input" type="text" value="${addLeadingZero(
      this._time.end.getHours()
  )}:${addLeadingZero(
    this._time.end.getMinutes()
)}" name="second-time" placeholder="${addLeadingZero(
    this._time.end.getHours()
)}:${addLeadingZero(this._time.end.getMinutes())}">
        </div>

        <label class="point__price">
          write price
          <span class="point__price-currency">€</span>
          <input class="point__input" type="text" value="${
  this._price
}" name="price" required>
        </label>
        <div class="point__buttons">
          <button class="point__button point__button--save" type="submit">Save</button>
          <button class="point__button" type="reset">Delete</button>
        </div>
        <div class="paint__favorite-wrap">
          <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite" ${
  this._isFavorite ? `checked` : ``
}>
          <label class="point__favorite" for="favorite">favorite</label>
        </div>
      </header>
      <section class="point__details">
        <section class="point__offers">
          <h3 class="point__details-title">offers</h3>
          <div class="point__offers-wrap">
          ${getMarkupOffersEdit(this._offers)}
          </div>
        </section>
        <section class="point__destination">
          <h3 class="point__details-title">Destination</h3>
          <p class="point__destination-text">${this._description}</p>
          <div class="point__destination-images">
            ${pictures.join(` `)}
          </div>
        </section>
        <input type="hidden" class="point__total-price" name="total-price" value="">
      </section>
    </form>
  </article>`;
  }

  get index() {
    return this._index;
  }

  set index(index) {
    this._index = index;
  }

  get element() {
    return this._element;
  }

  get offers() {
    return this._offers;
  }

  set submitHandler(fn) {
    const handler = function (evt) {
      evt.preventDefault();
      fn(evt);
    };

    this._submitHandler = handler;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._element.style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  updateDestination(data) {
    this._destination = data.name;
    this._description = data.description;
    this._images = data.pictures.slice();
  }

  updateOffers(offers) {
    if (offers && offers.slice) {
      this._offers = offers.slice();
    } else {
      this._offers = [];
    }
  }

  toRAW() {
    return {
      'destination': {
        'name': this._destination,
        'description': this._description,
        'pictures': this._images
      },

      'type': this._type === `check` ? `check-in` : this._type,
      'offers': [...this._offers.values()],
      // eslint-disable-next-line camelcase
      'date_from': this._time.start.getTime(),
      // eslint-disable-next-line camelcase
      'date_to': this._time.end.getTime(),
      // eslint-disable-next-line camelcase
      'base_price': this._price,
      ' id': this._id,
      // eslint-disable-next-line camelcase
      'is_favorite': this._isFavorite
    };
  }

  _resetHandler(evt) {
    const points = getPoints();
    const formElements = this._element.querySelectorAll(
        `form input, form select, form textarea, form button`
    );
    const resetButton = this._element.querySelector(`button[type=reset]`);
    resetButton.textContent = `Deleting...`;

    this._element.style.border = `none`;
    formElements.forEach((elem) => {
      elem.setAttribute(`disabled`, `disabled`);
    });
    evt.preventDefault();
    provider
      .deletePoint({id: this._id})
      .then(() => {
        this._unrender();
        points[this._index] = null;
        cost.render();
      })
      .catch(() => {
        formElements.forEach((elem) => {
          elem.removeAttribute(`disabled`);
        });

        this._element.style.border = `1px solid red`;
        resetButton.textContent = `Delete`;
        this.shake();
      });
  }

  _changeIconHandler() {
    const destinationLabel = this._element.querySelector(
        `.point__destination-label`
    );
    getOffers().then((offers) => {
      const type = this._element.querySelector(
          `.travel-way__select-input:checked`
      );
      const icon = this._element.querySelector(`.travel-way__label`);
      icon.textContent = pointsIcons[type.value];

      this.updateOffers(offers[type.value]);
      const offersWrap = this._element.querySelector(`.point__offers-wrap`);
      offersWrap.innerHTML = getMarkupOffersEdit(offers[type.value]);
      destinationLabel.textContent = pointsTexts[type.value];
    });

    const openSelectInput = this._element.querySelector(`.travel-way__toggle`);
    openSelectInput.click();
  }

  _changeOffersHandler(evt) {
    const offer = this._offers[evt.target.dataset.id];
    const priceInput = this._element.querySelector(`input[name="price"]`);

    if (!offer.accepted) {
      offer.accepted = true;
      this._price = parseInt(this._price, 10) + offer.price;
    } else {
      offer.accepted = false;
      this._price = parseInt(this._price, 10) - offer.price;
    }
    priceInput.value = this._price;
    cost.render();
  }

  _changeDestinationHandler(evt) {
    const destinations = getDestinations();
    const newDestination = evt.target.value;

    if (destinations[newDestination]) {
      this.updateDestination(destinations[newDestination]);
    }

    const description = this._element.querySelector(`.point__destination-text`);
    description.textContent = this._description;

    const images = this._element.querySelector(`.point__destination-images`);
    images.innerHTML = getMarkupImages(this._images);
  }

  _changeFavoritHandelr() {
    const points = getPoints();

    if (this._isFavorite) {
      this._isFavorite = false;
      points[this._index].point.isFavorite = false;
    } else {
      this._isFavorite = true;
      points[this._index].point.isFavorite = true;
    }
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
      'enableTime': true,
      'noCalendar': true,
      'altInput': true,
      'altFormat': `H:i`,
      'dateFormat': `H:i`,
      'time_24hr': true,
      'defaultDate': this._time.start
    });

    flatpickr(this._element.querySelector(`input[name=second-time]`), {
      'enableTime': true,
      'noCalendar': true,
      'altInput': true,
      'altFormat': `H:i`,
      ' dateFormat': `H:i`,
      'time_24hr': true,
      'defaultDate': this._time.end
    });

    this._element
      .querySelectorAll(`.travel-way__select-input`)
      .forEach((option) => {
        option.addEventListener(`change`, () => {
          this._changeIconHandler();
        });
      });

    this._element
      .querySelector(`.point__favorite-input`)
      .addEventListener(`change`, this._changeFavoritHandelr);

    this._element.querySelector(`.point__date`).style.display = `inline`;

    this._element
      .querySelector(`.point__destination-input`)
      .addEventListener(`change`, this._changeDestinationHandler);

    this._element.querySelectorAll(`.point__offers-input`).forEach((it) => {
      it.addEventListener(`change`, this._changeOffersHandler);
    });
  }
}

import Point from "./point";
import OffersModel from "./offers-model";
import DestinationModel from "./destination-model";

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export default class Provider {
  constructor({api, store, generateId}) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;
  }

  updatePoint({id, data}) {
    if (id === ``) {
      return this.createPoint({data});
    }
    if (this._isOnline()) {
      return this._api.updatePoint({id, data}).then((point) => {
        this._store.setItem({key: point.parsedData.id, item: point.newData});

        return point.parsedData;
      });
    } else {
      const point = data;
      this._needSync = true;
      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(Point.parseServerData(point));
    }
  }

  createPoint({data}) {
    if (this._isOnline()) {
      return this._api.createPoint({data}).then((point) => {
        this._store.setItem({key: point.parsedData.id, item: point.newData});

        return point.parsedData;
      });
    } else {
      const point = data;
      point.id = this._generateId();
      this._needSync = true;
      this._store.setItem({key: point.id, item: point});
      return Promise.resolve(Point.parseServerData(point));
    }
  }

  deletePoint({id}) {
    if (id === ``) {
      return Promise.resolve(true);
    }
    if (this._isOnline()) {
      return this._api.deletePoint({id}).then(() => {
        this._store.removeItem({key: id});
      });
    } else {
      this._needSync = true;
      this._store.removeItem({key: id});
      return Promise.resolve(true);
    }
  }

  getPoints() {
    if (this._isOnline()) {
      return this._api.getPoints().then((points) => {
        points.data.map((it) => {
          return this._store.setItem({key: it.id, item: it});
        });

        return points.parsedData;
      });
    } else {
      const rawPointsMap = this._store.getAll();
      const rawPoints = objectToArray(rawPointsMap);
      const points = Point.parseData(rawPoints);

      return Promise.resolve(points);
    }
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations().then((destinations) => {
        this._store.setOptions({
          key: `destinations`,
          item: destinations.data
        });

        return destinations.parsedData;
      });
    } else {
      const destinations = DestinationModel.parseDestinations(
          this._store.getOption({key: `destinations`})
      );
      return Promise.resolve(destinations);
    }
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers().then((offers) => {
        this._store.setOptions({
          key: `offers`,
          item: offers.data
        });

        return offers.parsedData;
      });
    } else {
      const offers = OffersModel.parseOffers(
          this._store.getOption({key: `offers`})
      );

      return Promise.resolve(offers);
    }
  }

  syncPoints() {
    return this._api.syncPoints({
      points: objectToArray(this._store.getAll())
    });
  }

  storageClear() {
    if (this._isOnline) {
      this._store.clear();
    }
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}

import {Point} from "./point";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
};

export const API = class {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    console.log(1);
    return this._load({
      url: `points`
    })
      .then(toJSON)
      .then((data) => this.getDestinations(data))
      .then(Point.parseData);
  }

  getDestinations(data) {
    console.log(data);
    return this._load({
      url: `destinations`
    })
      .then(toJSON)
      .then((destinations) => {
        console.log(destinations);
        data = data.map((it) => {
          it.destinations = destinations;
          return it;
        });
        return data;
      });
  }

  getOffers() {
    return this._load({
      url: `offers`
    }).then(toJSON);
  }

  createPoint({point}) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({
        "Content-Type": `application/json`
      })
    }).then(toJSON);
  }

  updatePoint({id, data}) {
    return this._load({
      url: `points/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": `application/json`
      })
    })
      .then(toJSON)
      .then(Point.parseServerData);
  }

  deletePoint({id}) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {
      method,
      body,
      headers
    }).then(checkStatus);
  }
};

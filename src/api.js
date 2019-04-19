import Point from "./point";
import OffersModel from "./offers-model";
import DestinationModel from "./destination-model";

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

export default class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._load({
      url: `points`
    })
      .then(toJSON)
      .then((data) => {
        const parsedData = Point.parseData(data);
        return {
          data,
          parsedData
        };
      });
  }

  getDestinations() {
    return this._load({
      url: `destinations`
    })
      .then(toJSON)
      .then((data) => {
        const parsedData = DestinationModel.parseDestinations(data);
        return {
          data,
          parsedData
        };
      });
  }

  getOffers() {
    return this._load({
      url: `offers`
    })
      .then(toJSON)
      .then((data) => {
        const parsedData = OffersModel.parseOffers(data);

        return {data, parsedData};
      });
  }

  createPoint({data}) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": `application/json`
      })
    })
      .then(toJSON)
      .then((newData) => {
        const parsedData = Point.parseServerData(newData);

        return {
          newData,
          parsedData
        };
      });
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
      .then((newData) => {
        const parsedData = Point.parseServerData(newData);
        return {
          newData,
          parsedData
        };
      });
  }

  deletePoint({id}) {
    return this._load({
      url: `points/${id}`,
      method: Method.DELETE
    });
  }

  syncPoints({points}) {
    return this._load({
      url: `points/sync`,
      method: `POST`,
      body: JSON.stringify(points),
      headers: new Headers({"Content-Type": `application/json`})
    }).then(toJSON);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {
      method,
      body,
      headers
    }).then(checkStatus);
  }
}

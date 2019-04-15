import {API} from "./api";
import {Store} from "./store";
import {Provider} from "./provider";

const URL = `https://es8-demo-srv.appspot.com/big-trip/`;
const AUTHORIZATION = `Basic eo0w590ik29889aaaa${performance.now()}`;
const POINTS_STORE_KEY = `points-store-key`;
const POINTS_OPTIONS_KEY = `points-options`;

const api = new API({
  endPoint: URL,
  authorization: AUTHORIZATION
});

const store = new Store({
  key: POINTS_STORE_KEY,
  storage: localStorage,
  optionsKey: POINTS_OPTIONS_KEY
});

export const provider = new Provider({
  api,
  store,
  generateId: () => String(performance.now())
});

import {API} from "./api";

const URL = `https://es8-demo-srv.appspot.com/big-trip/`;
const AUTHORIZATION = `Basic eo0w590ik29889aaaa${performance.now()}`;
export const api = new API({
  endPoint: URL,
  authorization: AUTHORIZATION
});

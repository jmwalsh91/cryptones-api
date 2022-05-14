import _ from "lodash"
import { getOhclv } from "../services/AxiosInstances";
import { TypedRequestBody, TypedResponse } from "../types/interfaces";
const express = require("express");

//router for "open, high, low, close, volume" query
const routerOhlcv = express.Router();

routerOhlcv.get(
  "",
  async (
    req: TypedRequestBody<Request>,
    res: TypedResponse<any>,
    err: Error
  ) => {
    let data = await getOhclv();
    //TODO: INTERCEPTOR to mutate data shape to conform to...
    //TODO: ...interface for Ohclv
    console.log(data);
    return res.send(data);
  }
);

//TODO: refactor this function
routerOhlcv.interceptors.response.use((response) => {
  console.log("interceptor");
  let target = response.data["Time Series Crypto (5min)"];

  function formatRes(arrOne, arrTwo) {
    let resFormatted
    return (resFormatted = _.zip(arrOne, arrTwo));
  }
  const reqKeys = Object.keys(target).map((thing) => {
    return Date.parse(thing);
  });
  const formattedOb = Object.values(target).map((thing) => {
    return Object.values(thing);
  });
  let volArr = formattedOb.map((thing) => {
    return thing.pop();
  });
  formatRes(reqKeys, formattedOb);
  return (response = { resFormatted, volArr });
});

export default routerOhlcv;

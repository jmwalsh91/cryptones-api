import _ from "lodash";
import { getOhclv } from "../services/AxiosInstances";
import {
  formatDate,
  getVolumeArrayFromOhclv,
  reshapeObject,
} from "../utils/reshape";
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

//TODO: refactor
routerOhlcv.interceptors.response.use((response) => {
  console.log("interceptor");
  let target = response.data["Time Series Crypto (5min)"];
  let formattedDate = formatDate(target);
  let objectValues = reshapeObject(target);
  let volumeArray = getVolumeArrayFromOhclv(objectValues);
  let formattedOhcl = _.zip(formattedDate, objectValues);
  return (response = { formattedOhcl, volumeArray });
});

export default routerOhlcv;

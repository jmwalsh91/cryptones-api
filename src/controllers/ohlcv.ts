import { getOhclv, getParamsOhclv } from "../services/AxiosInstances";

import { RequestParams, TypedRequestBody, TypedResponse } from "../types/interfaces";
const express = require("express");

//router for "open, high, low, close, volume" query
const routerOhlcv = express.Router();
//TODO: error handling

//index route .get() -- call getOhclv() which sends request to API, response from api gets intercepted and data is reshaped, routerOhlcv sends reshaped data to client as response.
routerOhlcv.get(
  "",
  async (
    req: TypedRequestBody<Request>,
    res: TypedResponse<any>,
    err: Error
  ) => {
    let data = await getOhclv();
    console.log(data);
    return res.send(data);
  }
);
//router to handle symbol params / interval params route
routerOhlcv.get("/:symbol/:interval", async (
  req: TypedRequestBody<Request>,
  res: TypedResponse<any>,
  err: Error
) => {
  //get symbol and interval from params
  const symbol: RequestParams['symbol'] = req.params.symbol
  const interval: RequestParams['interval'] = req.params.interval
  //pass symbol and interval to getParamsOhclv
  //getParams... validates args are strings that are included in array of acceptable values
  // & if valid, executes query via alphavantaga axios instance => response is intercepted and reformatted => data is returned and sent to client. 
  let data = await getParamsOhclv(symbol, interval);
  console.log(data);
  return res.send(data);
})
export default routerOhlcv;

import { getOhclv } from "../services/AxiosInstances";

import { TypedRequestBody, TypedResponse } from "../types/interfaces";
const express = require("express");

//router for "open, high, low, close, volume" query
const routerOhlcv = express.Router();
//TODO: error handling
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

export default routerOhlcv;


import { TypedRequestBody, TypedResponse } from "../types/interfaces";
const express = require("express");

//router for cache routes 
export const routerCache = express.Router();



routerCache.post(
  "",
  async (
    req: TypedRequestBody<Request>,
    res: TypedResponse<any>,
    err: Error
  ) => {
    console.log(req.body)
    res.send(req.body)
  }
);
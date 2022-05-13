import { JsonableValue } from "ts-jest";
import { TypedRequestBody, TypedResponse } from "../types/interfaces";
const express = require("express")

const routerOhlcv = express.Router();

routerOhlcv.get("/base", (req: TypedRequestBody<Request>, res: TypedResponse<object>, err: Error) => {
  return res.json({message: "message"})
});

export default routerOhlcv;

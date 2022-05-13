import { JsonableValue } from "ts-jest";
import { getOhclv } from "../services/AxiosInstances";
import { TypedRequestBody, TypedResponse } from "../types/interfaces";
const express = require("express")

const routerOhlcv = express.Router();

routerOhlcv.get("", async (req: TypedRequestBody<Request>, res: TypedResponse<any>, err: Error) => {
    let data = await getOhclv()
    console.log(data)
    return res.send(data)
  }
  );

export default routerOhlcv;

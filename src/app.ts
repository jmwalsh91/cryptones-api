require("dotenv").config();

import type { TypedRequestBody, TypedResponse } from "./types/interfaces";
import routerOhlcv from "./controllers/ohlcv";
import { initServer } from "./utils/server";
import cors from "cors";
import { routerCache } from "./controllers/cache";
import { isExpressionStatement } from "typescript";
import { Errback, Response } from "express";
const bodyParser = require("body-parser");
//initialize server, accepts no args

const app = initServer();
//TODO: ENV VARS FOR ORIGIN INSTEAD OF WILDCARD
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Index route: format for consistent implementation of interface and type.
//TODO: Interfaces for response shape, abstract response validation from interface for each endpoint.
app.get("/", (req: {}, res: TypedResponse<{ response: string }>) =>
  res.send({ response: "This is a response" })
);

//Routes
app.use("/api/ohlcv", routerOhlcv);
app.use("/api/cache", routerCache);

const port = process.env.PORT || 80;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`running. listening on port ${port}`));
}

//404 Middleware TODO: strengthen typing
app.use(function (_req, res: Response, error: Error) {
  if (error) {
    console.log(error);
    return res.status(404).send("Requested resource does not exist.");
  }
});

export default app;

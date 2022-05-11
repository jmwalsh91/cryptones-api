import type { TypedRequestBody, TypedResponse } from "interfaces";

const express = require("express");
const app = express();

//Index route: format for consistent implementation of interface and type. 
//TODO: Interfaces for response shape, abstract response validation from interface for each endpoint.
app.get("/", (req: Express.Request, res:TypedResponse<{response: string}>) => res.json({"response" : "This is a response"}));

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`running. listening on port ${port}`);
});

export default app 
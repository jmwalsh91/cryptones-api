const express = require("express")

const routerOhlcv = express.Router();

routerOhlcv.get("/base", (req, res, err) => {
  return req ? res.json({ message: "test" }) : res.json({ message: "null" });
});

export default routerOhlcv;

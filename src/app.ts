const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("index route hit"));

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`running. listening on port ${port}`);
});

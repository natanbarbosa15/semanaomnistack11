const express = require("express");
const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", function (req, res) {
  res.redirect(301, "https://be-the-hero-275300.rj.r.appspot.com/");
});

app.listen(PORT);

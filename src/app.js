const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");
const app = express();

app.options("*", cors({ origin: "*" }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/v1", routes);
app.use(errors());
app.disable("x-powered-by");

module.exports = app;

require("custom-env").env("expressjs");
const express = require("express");
const favicon = require("express-favicon");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const RateLimiter = require("./rate-limit/init");

const app = express();
const port = process.env.PORT || 8080;

function initExpressAddons() {
  // Use CORS
  app.use(cors());
  // Use Helmet protection
  app.use(helmet());
  // Config Rate Limiter
  const limiter = RateLimiter(1 * 60000, 1000);
  // Use rate limiter
  app.use(limiter);
}

initExpressAddons();

// Serve static favicon.ico and build dir.
app.use(favicon(__dirname + "/build/favicon.ico")); // the __dirname is the current directory from where the script is running
app.use(express.static(path.join(__dirname, "build")));

// Routes
app.get("/_ah/warmup", function (req, res) {
  return res.status(200).send("Front-End OK!");
});
app.get(
  [
    "/",
    "/login",
    "/register",
    "/about",
    "/useterms",
    "/privacyterms",
    "/app/profile",
    "/app/profile/newincident",
  ],
  function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  }
);

// Invalid route handler
app.all("*", function (req, res) {
  throw new Error("Not Found");
});
// Serve 404 page
app.use(function (e, req, res, next) {
  if (e.message === "Not Found") {
    res.status(404).sendFile(path.join(__dirname, "build", "index.html"));
  }
});

app.listen(port);

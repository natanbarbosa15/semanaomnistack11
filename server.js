require("custom-env").env("expressjs");
const express = require("express");
const favicon = require("express-favicon");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const RateLimiter = require("./rate-limit/init");
const redis = require("redis");
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

const { routes } = require("./routes.js");

const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  require("@google-cloud/trace-agent").start();
  require("@google-cloud/debug-agent").start({ allowExpressions: true });
}

function initExpressAddons() {
  // Use CORS
  app.use(cors());
  // Use Helmet protection
  app.use(helmet());
  // Config Rate Limiter
  const limiter = RateLimiter(1 * 60000, 1000, redisClient);
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
app.get(Object.values(routes), function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

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

const server = app.listen(port);

// Gracefully close connection to Redis and close HTTP server on process exit.
process.on("exit", function () {
  redisClient.quit();
  server.close();
});

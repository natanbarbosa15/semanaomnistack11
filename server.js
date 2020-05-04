const express = require("express");
const favicon = require("express-favicon");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const requestIp = require("request-ip");
const path = require("path");
const port = process.env.PORT || 8080;
const { google } = require("googleapis");
const appengine = google.appengine("v1");

async function firewallCreateBlock(clientIp) {
  // This method looks for the GOOGLE_APPLICATION_CREDENTIALS environment variable.
  const auth = new google.auth.GoogleAuth({
    // Scopes can be specified either as an array or as a single, space-delimited string.
    scopes: [
      "https://www.googleapis.com/auth/appengine.admin",
      "https://www.googleapis.com/auth/cloud-platform",
      "https://www.googleapis.com/auth/cloud-platform.read-only",
    ],
  });
  const authClient = await auth.getClient();

  const list = await appengine.apps.firewall.ingressRules.list({
    appsId: "be-the-hero-275300",
    auth: authClient,
  });
  const rules = list.data.ingressRules;
  let nextPriority = 0;
  if (rules.length > 1) {
    nextPriority = rules[rules.length - 2].priority + 1;
  } else {
    nextPriority = 1;
  }

  if (clientIp.startsWith("::ffff:")) {
    clientIp = clientIp.replace("::ffff:", "") + "/32";
  }

  // Create Firewall Rule to Block given IP
  await appengine.apps.firewall.ingressRules.create({
    appsId: "be-the-hero-275300",
    requestBody: {
      priority: nextPriority,
      action: "DENY",
      sourceRange: clientIp,
      description: "DDoS Block",
    },
    auth: authClient,
  });
}

const app = express();

// Config Rate Limiter
const limiter = rateLimit({
  windowMs: 500, // 1 second
  max: 5, // limit each IP to 10 requests per windowMs
  onLimitReached(req, res, options) {
    const clientIp = requestIp.getClientIp(req);
    firewallCreateBlock(clientIp).catch(console.error);
  },
});

// Use CORS
app.use(cors());
// Use Helmet protection
app.use(helmet());
// Use rate limiter
app.use(limiter);

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

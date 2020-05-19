const requestIp = require("request-ip");
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const redis = require("redis");
const firewallApiCall = require("../appengine/firewallApi");

/**
 * Function to initialize Express Rate Limiter
 * @method function
 * @param {Number} windowMs Number for reset time in milliseconds
 * @param {Number} maxAttempt Number max attempts before block IP
 */
function RateLimiter(windowMs, maxAttempt) {
  const client = redis.createClient({
    url: process.env.REDIS_URL,
  });

  return rateLimit({
    windowMs: windowMs,
    max: maxAttempt,
    keyGenerator(req, res) {
      var clientIp = requestIp.getClientIp(req);
      if (clientIp.startsWith("::ffff:")) {
        clientIp = clientIp.replace("::ffff:", "");
      }
      return clientIp;
    },
    async onLimitReached(req, res, options) {
      const clientIp = requestIp.getClientIp(req);
      await firewallApiCall(clientIp).catch(console.error);
    },
    store: new RedisStore({
      client: client,
    }),
    delayMs: 0, // disable delaying - full speed until the max limit is reached
  });
}

module.exports = RateLimiter;

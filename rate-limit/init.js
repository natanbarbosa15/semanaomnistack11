const requestIp = require("request-ip");
const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const firewallApiCall = require("../appengine/firewallApi");

/**
 * Function to initialize Express Rate Limiter
 * @method function
 * @param {Number} windowMs Number for reset time in milliseconds
 * @param {Number} maxAttempt Number max attempts before block IP
 */
function RateLimiter(windowMs, maxAttempt, redisClient) {
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
      client: redisClient,
    }),
    delayMs: 0, // disable delaying - full speed until the max limit is reached
  });
}

module.exports = RateLimiter;

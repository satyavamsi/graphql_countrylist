const rateLimit = require("express-rate-limit");
const config = require("../config");

// rateLimit middleware with 30 requests per minute as config
const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: config.rateLimit,
  message: {
    status: 429,
    message: `You have exceeded the max ${config.rateLimit} requests in 1 min limit!`,
  },
  headers: true,
});

module.exports = rateLimiter;

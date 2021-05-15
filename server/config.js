module.exports = {
  port: process.env.PORT || 4000,
  secret: process.env.SECRET || "supersecret",
  rateLimit: process.env.RATE_LIMIT || 30,
  api_key: process.env.API_KEY || "4b85f3892e76329e4873cff19e7e572c",
};

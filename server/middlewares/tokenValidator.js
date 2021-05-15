const jwt = require("jsonwebtoken");
const config = require("../config");

const validateToken = (req, res, next) => {
  // Retrieve the access token for headers
  const token = req.headers["x-access-token"];

  try {
    const options = {
      expiresIn: "1d",
    };
    // verify makes sure that the token hasn't expired and has been issued by us
    result = jwt.verify(token, config.secret, options);
    req.decoded = result;
    next();
  } catch (err) {
    // Throw an error just in case anything goes wrong with verification
    result = {
      error: "Authentication error. Token invalid.",
      status: 401,
    };
    res.status(401).send(result);
  }
};

module.exports = validateToken;

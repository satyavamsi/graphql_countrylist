const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const schema = require("./schema/schema");
const config = require("./config");

const rateLimiter = require("./middlewares/rateLimiter");
const handleUndefinedRoutes = require("./middlewares/handleUndefined");
const validateToken = require("./middlewares/tokenValidator");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Rate limit all the requests
app.use(rateLimiter);

// Handle Login - send back JWT token
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const token = jwt.sign({ sub: username }, config.secret, { expiresIn: "1d" });
  res.send({
    token,
  });
});

// Handle all the graphql requests
app.use(
  "/api/graphql",
  validateToken,
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: () => context(req),
  }))
);

// Handle all the remaining routes
app.use("*", handleUndefinedRoutes);

app.listen(config.port, () => {
  console.log(`Server started on port: ${config.port}`);
});

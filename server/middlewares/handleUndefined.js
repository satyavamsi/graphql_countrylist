const handleUndefinedRoutes = (req, res) => {
  res.status(404).send({
    message: "Hey there from Anyfin! This end point is not supported.",
  });
};

module.exports = handleUndefinedRoutes;

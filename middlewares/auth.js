const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    // if token does not exist
    if (!token) {
      return res
        .status(401)
        .json({ message: "no authentication token, authorization denied" });
    }

    // if token exists
    // verify token and return true or false
    const verified = jwt.verify(token, "passwordKey");
    if (!verified)
      return res
        .status(401)
        .json({ message: "token verification failed, authorization denied" });

    req.user = verified.id;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = auth;

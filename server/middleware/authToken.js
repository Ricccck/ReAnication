require("dotenv").config({ path: "../../.env.local" });
const JWT = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const token = req.header("auth-token");

  if (token) {
    const secret = process.env.ACCESS_TOKEN_SECRET_KEY;

    await JWT.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(403).send({
          error: "Invalid or expired access token"
        });
      } else {
        req.userEmail = decoded.userEmail;
        next();
      }
    });
  } else {
    res.status(404).send({
      error: "Token not found"
    });
  }
};

module.exports = authToken;
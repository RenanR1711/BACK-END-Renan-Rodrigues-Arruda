const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["token"];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "nao autorizado token" });
        return;
      } else {
        const userExist = await user.findOne({ _id: decoded.userId });
        console.log(decoded);
        if (userExist) {
          next();
        }
      }
    });
  } else {
    res.status(401).send({ message: "nao autorizado token" });
  }
}

module.exports = verifyToken;

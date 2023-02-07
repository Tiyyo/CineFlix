const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const createTokens = (user) => {
  const accesToken = sign(
    { username: user.username, email: user.email },
    process.env.TOKEN_KEY,
    { expiresIn: "24h" }
  );

  return accesToken;
};

const validateToken = (req, res, next) => {
  const accesToken = req.cookies["acces-token"];

  if (!accesToken)
    return res.status(400).json({ error: "User not authenticated" });

  try {
    const validToken = verify(accesToken, process.env.TOKEN_KEY);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

module.exports = { createTokens, validateToken };

const JWT = require("jsonwebtoken");

const secret = process.env.SECRET_KEY;

function createTokenForUser(user) {
  const payLoad = {
    _id: user._id,
    email: user.email,
    role: user.role,
    profileImageURL: user.profileImageURL,
  };

  const token = JWT.sign(payLoad, secret);
  return token;
}

function validateToken(token) {
  const payLoad = JWT.verify(token, secret);
  return payLoad;
}

module.exports = { createTokenForUser, validateToken };

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const payload = {
    id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

  return token;
};

module.exports = {
  generateToken,
};

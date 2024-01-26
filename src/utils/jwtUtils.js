const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    userId: user._id,
    email: user.email,
  };

  const options = {
    expiresIn: "1h",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  return token;
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = decoded;
    next();
  });
}

module.exports = { generateToken, verifyToken };

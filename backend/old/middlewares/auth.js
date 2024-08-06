const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log(req.header);
  const token = req.header("x-auth-token");
  // const token = req.header("Authorization");
  // const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

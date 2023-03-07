const jwt = require("jsonwebtoken");

exports.validateToken = async (req, res, next) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return res.status(400).json({
        message: "Jwt token required"
      });
    }

    jwt.verify(token, req.app.get("privateKey"), function (err, decoded) {
      if (err) {
        return res.status(400).json({ err, message: "JWT invalid" });
      }
      console.log(
        decoded
      )
      req.body.userId = decoded._id
    });

    next();
  } catch (err) {
    return res.status(500).json({ err, message: "Internal Server Error" });
  }
};

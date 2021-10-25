const { auth } = require("../services/firebase");

async function authMiddleware(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.substr(7);
    try {
      await auth.verifyIdToken(token);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).send({
      error: "unauthorized",
    });
  }
}

module.exports = authMiddleware;

const Router = require("express").Router;
const userRouter = Router();
const { userController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

// GET
userRouter.get(
  "/get-user-by-firebase-id/:firebaseId",
  authMiddleware,
  userController.getUserByFirebaseId
);

// PATCH

// POST
userRouter.post("/register", userController.registerNewUser);

// Export
module.exports = userRouter;

const Router = require("express").Router;
const gifRouter = Router();
const { gifController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

// GET
gifRouter.get("/get-by-id/:id", gifController.getGifById);

// PATCH

// POST
gifRouter.post("/upload", authMiddleware, gifController.uploadNewGif);

// Export
module.exports = gifRouter;

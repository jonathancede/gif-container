const Router = require("express").Router;
const gifRouter = Router();
const { gifController } = require("../controllers");
const { authMiddleware } = require("../middlewares");

// GET
gifRouter.get("/get-all", gifController.getAllGifs);
gifRouter.get("/get-by-id/:id", gifController.getGifById);
gifRouter.get("/get-gifs-by-title/:title", gifController.getGifsByTitle);
gifRouter.get(
  "/get-gifs-by-username/:username",
  gifController.getGifsByUserName
);
gifRouter.get("/get-gifs-by-tag/:tag", gifController.getGifsByTag);

// PATCH

// POST
gifRouter.post("/upload", authMiddleware, gifController.uploadNewGif);

// Export
module.exports = gifRouter;

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GifSchema = new Schema(
  {
    owner: {
      type: String,
      required: [true, "Please, give us your username"],
    },
    title: {
      type: String,
      required: [true, "Please, give us an title"],
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    favUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    url: {
      type: String,
      required: [true, "Please, give us an url"],
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Gifs = mongoose.model("gifs", GifSchema);

module.exports = Gifs;

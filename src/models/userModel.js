const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    firebaseId: {
      type: String,
      unique: true,
      required: [true, "Please, a firebase id is neccesary"],
    },
    userName: {
      type: String,
      required: [true, "Please, give us your username"],
    },
    email: {
      type: String,
      required: [true, "Please, give us your email"],
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      default: "",
    },
    myGifs: [
      {
        type: Schema.Types.ObjectId,
        ref: "tracks",
      },
    ],
    favGifs: [
      {
        type: Schema.Types.ObjectId,
        ref: "tracks",
      },
    ],
    gifsHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "gifs",
      },
    ],
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", UserSchema);

module.exports = Users;

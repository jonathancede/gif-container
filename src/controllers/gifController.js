const { Gifs, Users } = require("../models");

async function getGifById(req, res) {
  const { id } = req.params;

  try {
    const foundGif = await Gifs.findOne({
      _id: id,
    });

    if (foundGif == null) {
      return res.status(201).send({
        ok: false,
        message: `Gif with id "${firebaseId}" doesn't exist`,
      });
    } else {
      return res.status(200).send({
        ok: true,
        message: "Gif found",
        data: foundGif,
      });
    }
  } catch (error) {
    return res.status(500).send({
      data: id,
      error: error.message,
    });
  }
}

async function uploadNewGif(req, res) {
  const { owner } = req.body;

  try {
    const { _id } = await Gifs.create(req.body);

    const userFound = await Users.findById(owner);
    userFound.myGifs.push(_id);
    await userFound.save();

    return res.status(200).send({
      message: "Gif uploaded successfully",
      id: _id,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
}

module.exports = {
  getGifById: getGifById,
  uploadNewGif: uploadNewGif,
};

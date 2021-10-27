const { Gifs, Users } = require("../models");

async function getGifById(req, res) {
  const { id } = req.params;

  try {
    const foundGif = await Gifs.findOne({
      _id: id,
    }).populate("owner");

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

// Filter function for string type filters
function filterGifs(allGifs, stringFilter, filter) {
  const lwcStringFilter = stringFilter.toLowerCase();
  let filteredGifs = [];

  for (const Gif of allGifs) {
    let GifDocFilter = Gif[filter].toLowerCase();
    if (GifDocFilter.includes(lwcStringFilter)) {
      filteredGifs.push(Gif);
    }
  }

  return filteredGifs;
}

async function getGifsByTitle(req, res) {
  const { title } = req.params;
  try {
    const allGifs = await Gifs.find({});
    const gifsToReturn = filterGifs(allGifs, title, "title");

    //Return Gifs found
    return res.status(200).send({
      message: "Gifs found",
      result: gifsToReturn,
    });
  } catch (error) {
    return res.status(500).send({
      data: title,
      error: error.message,
    });
  }
}

async function getGifsByUserName(req, res) {
  const { username } = req.params;
  try {
    const allUsers = await Users.find({}).populate("myGifs");
    const usersFound = filterGifs(allUsers, username, "userName");

    let gifsAcumulate = [];
    usersFound.forEach((user) => {
      gifsAcumulate = [...gifsAcumulate, ...user.myGifs];
    });

    const gifsFiltered = gifsAcumulate.reduce((unique, o) => {
      if (!unique.some((obj) => obj._id === o._id)) {
        unique.push(o);
      }
      return unique;
    }, []);

    //Return Gifs found
    return res.status(200).send({
      message: "Gifs found",
      result: gifsFiltered,
    });
  } catch (error) {
    return res.status(500).send({
      data: username,
      error: error.message,
    });
  }
}

async function getGifsByTag(req, res) {
  const { tag } = req.params;
  try {
    const allGifs = await Gifs.find({});

    let gifsAcumulate = [];
    for (const Gif of allGifs) {
      for (const Tag of Gif.tags) {
        let tagsFilter = Tag.toLowerCase();
        if (tagsFilter.includes(tag.toLowerCase())) {
          gifsAcumulate.push(Gif);
        }
      }
    }

    const gifsFiltered = gifsAcumulate.reduce((unique, o) => {
      if (!unique.some((obj) => obj._id === o._id)) {
        unique.push(o);
      }
      return unique;
    }, []);

    //Return Gifs found
    return res.status(200).send({
      message: "Gifs found",
      result: gifsFiltered,
    });
  } catch (error) {
    return res.status(500).send({
      data: tag,
      error: error.message,
    });
  }
}

module.exports = {
  getGifById: getGifById,
  uploadNewGif: uploadNewGif,
  getGifsByTitle: getGifsByTitle,
  getGifsByUserName: getGifsByUserName,
  getGifsByTag: getGifsByTag,
};

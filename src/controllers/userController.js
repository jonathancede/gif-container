const { Users } = require("../models");

async function registerNewUser(req, res) {
  const { email, ...reqBody } = req.body;

  try {
    const foundUser = await Users.findOne({
      email: email,
    });

    if (!foundUser) {
      const { _id } = await Users.create({
        email: email,
        ...reqBody,
      });
      return res.status(200).send({
        message: "User created successfully",
        data: {
          userId: _id,
        },
      });
    } else {
      return res.status(201).send({
        message: "User already exists",
      });
    }
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
}

async function getUserByFirebaseId(req, res) {
  const { firebaseId } = req.params;

  try {
    const foundUser = await Users.findOne({
      firebaseId: firebaseId,
    });

    if (foundUser == null) {
      return res.status(201).send({
        message: `User with Firebase Id "${firebaseId}" doesn't exist`,
      });
    } else {
      return res.status(200).send({
        message: "User found",
        currentUser: foundUser,
      });
    }
  } catch (error) {
    return res.status(500).send({
      data: firebaseId,
      error: error.message,
    });
  }
}

module.exports = {
  registerNewUser: registerNewUser,
  getUserByFirebaseId: getUserByFirebaseId,
};

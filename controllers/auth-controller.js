const User = require("../models/user-model");

module.exports = {
  signup,
  login,
};

async function signup(req, res) {
  try {
    const { username, password } = req.body;

    const isAlreadyExist = await User.findOne({ username });
    console.log("isAlreadyExist:", isAlreadyExist);

    if (isAlreadyExist) {
      return res.status(400).send("user already exist");
    }

    const newUser = await User.create({
      username,
      password,
    });
    const selectedUser = newUser.toObject();
    res.status(201).json({ selectedUser });
  } catch (err) {
    console.log("err:", err);
    res.status(500).send(err.message);
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Please provide username and password");
    }

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send("couldnt find user");
    }

    const isCorrect = user.password === password;

    if (!user || !isCorrect) {
      return res.status(401).send("Incorrect username or password");
    }

    const selectedUser = user.toObject();
    res.json({
      user: selectedUser,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function profile(req, res) {
  try {
    const user = req.user

    res.send(user);

  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
}

module.exports = profile;

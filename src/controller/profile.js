const jwt = require("jsonwebtoken");
const { validateEditProfileData } = require('../utils/validator')

async function profile(req, res) {
  try {
    const user = req.user

    res.send(user);

  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
}

async function editProfile(req, res){
  try{
    if(!validateEditProfileData(req)){
      throw new Error("invalid edit request")
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))

  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
}

module.exports = {
  profile,
  editProfile
}
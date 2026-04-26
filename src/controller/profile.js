// const jwt = require("jsonwebtoken");
const { validateEditProfileData } = require('../utils/validator')

async function viewProfile(req, res) {
  try {
    const user = req.user;

    res.send(user)

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    })
  }
}

async function editProfile(req, res){
  try{
    if(!validateEditProfileData(req)){
      throw new Error("invalid edit request")
    }

    const loggedInUser = req.user;
    console.log(loggedInUser)
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
    res.send(`${loggedInUser.firstName}, your profile updated successfully`)

  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
}

module.exports = {
  viewProfile,
  editProfile
}
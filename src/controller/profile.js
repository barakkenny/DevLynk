const jwt = require("jsonwebtoken");
const { validateProfileEditData } = require('../utils/validator')

async function viewProfile(req, res) {
  try {
    const user = req.user;

    res.send(user)

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

async function editProfile(req, res){
  try{
    if(!validateProfileEditData(req)){
      throw new Error("invalid edit request")
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]))
    
    await loggedInUser.save();
    res.send(`${loggedInUser.firstName}, your profile updated successfully`)

  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
}

module.exports = {
  viewProfile,
  editProfile
}
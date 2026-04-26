const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        const { token } = req.cookies;
        if (!token) {
          throw new Error("Invalid token");
        }
    
        const isTokenValid = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        const { _id } = isTokenValid;
    
        const user = await User.find(_id);
        if (!user) {
          throw new Error("User does not exist");
        }
    
        next()
    }catch(err) {
      return res.status(400).json({
        success: false,
        message: err.message
      })
    }
    
}


module.exports = {
    userAuth,
}
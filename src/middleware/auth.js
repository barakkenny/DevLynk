const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try{
        const { token } = req.cookies;
        if (!token) {
          throw new Error("Invalid token");
        }
    
        const isTokenValid = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
        const { userId } = isTokenValid;
    
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User does not exist");
        }

        req.user = user;
    
        next();
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
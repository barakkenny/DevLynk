const User = require("../models/user");
const bcrypt = require("bcrypt")
 

async function signUp(req, res){
    try{
        const {firstName, lastName, email, password} = req.body;

        const checkExistingUser = await User.findOne({email});
        if(checkExistingUser){
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const registeredUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await registeredUser.save();

        if(registeredUser){
            return res.status(201).json({
                success: true,
                message: "User registered successfully"
            });
        }


    }catch(err){
        console.log(err)
    }
 }

 module.exports = {
    signUp
 }
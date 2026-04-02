const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt =  require('jsonwebtoken')

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
                message: "User registered successfully",
                data: registeredUser
            });
        }


    }catch(err){
        console.log(err)
    }
 }

 async function signIn(req, res){
    const { firstName, lastName, password} = req.body

    const user = await User.findOne({firstName, lastName});
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Invalid credential"
        });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        })
    };


    const accessToken = jwt.sign({
        userId: user._id,
    }, 
    process.env.JWT_SECRET_KEY,
     {
        expiresIn: '15m'
    })

    res.cookie("token", accessToken)

    res.status(200).json({
        success: true,
        message: 'User successfully logged in',
        data: user,
        accessToken,
    })
 }


 module.exports = {
    signUp,
    signIn
 }
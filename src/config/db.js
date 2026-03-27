const mongoose = require('mongoose')
require('dotenv').config();

const dbConnection = async () => {
     try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongodb connected successfully')
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = dbConnection;
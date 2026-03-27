const express = require('express')
const {PORT} = require('./src/config/server');
const dbConnection = require('./src/config/db');
const { authRouter } = require('./src/routes/userRoutes');

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

dbConnection();

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${3000}`)
})
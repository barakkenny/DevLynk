const express = require('express')
const {PORT} = require('./src/config/server');
const dbConnection = require('./src/config/db');
const { authRouter } = require('./src/routes/userRoutes');
const profileRouter = require('./src/routes/profileRoute');
const cookieParser = require('cookie-parser');
const connectionRouter = require('./src/routes/connectionRoute');

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/profile', profileRouter)
app.use('/connection-request', connectionRouter)

dbConnection();


app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${PORT}`);
})
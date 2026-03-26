const express = require('express')
const serverConfig = require('./src/config/serverConfig');
const { authRouter } = require('./src/routes/userRoutes');


const app = express();
app.use(express.json())

const PORT = serverConfig.PORT

app.listen(PORT, ()=> {
    console.log(`Server is running on PORT ${3000}`)
})
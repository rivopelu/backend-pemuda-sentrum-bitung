require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { bgMagenta, bgWhite, bgRed } = require('colors');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
})
    .then(res => {
        console.log(bgWhite.black.bold('database mongoDB Telah Terhubung'));
    })
    .catch(error => {
        console.log(bgRed.bold(`error ::: ${error}`))
    })




const app = express();
const port = process.env.PORT

// MAIN ROUTES IMPORT
const AuthRoutes = require('./src/routes/AuthRoutes')

// UTILS
app.use(bodyParser.json());


// MAIN ROUTES
app.use('/api/auth', AuthRoutes)




// SERVER MAIN
app.listen(port, (req, res) => {
    console.log(bgMagenta.bold(`server telah berjalan di port : ${port}`))
})
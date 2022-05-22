const express = require('express');
const router = express.Router();


const { userRegister } = require('../controllers/AuthController')

router.get('/register', userRegister);



module.exports = router
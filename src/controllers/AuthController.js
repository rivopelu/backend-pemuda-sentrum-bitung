require('dotenv').config()
const User = require('../models/Users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.userRegister = async (req, res) => {
    const { username, email, name, password } = req.body

    const hashPassword = await bcryptjs.hash(password, 10)
    const user = new User({
        name, username, email, password: hashPassword
    })

    const dataUser = await User.findOne({ username })
    const emailUser = await User.findOne({ email })

    if (dataUser) {
        return res.status(400).json({
            message: 'username telah terpakai',
        })
    }

    if (emailUser) {
        return res.status(400).json({
            message: 'email telah terpakai',
        })
    }

    user.save()

    return res.status(201).json({
        message: 'user berhasil di daftarkan',
        data: user
    })
}

exports.userLogin = async (req, res) => {
    const { username, password } = req.body;

    const dataUser = await User.findOne({ username: username })
    const emailUser = await User.findOne({ email: username })


    console.log(`user : ${dataUser}`)
    console.log(`email : ${emailUser}`)

    const atauUser = dataUser || emailUser

    if (!atauUser) {
        // proses Gagal
        return res.status(404).json({
            message: 'username atau email tidak tersedia'
        })
    }

    const passwordUser = await bcryptjs.compare(password, atauUser.password)
    if (!passwordUser) {
        return res.status(404).json({
            message: 'Login Gagal'
        })
    }

    const data = {
        id: atauUser._id
    }
    const token = await jwt.sign(data, process.env.JWT_KEY,)
    return res.status(200).json({
        message: `user berhasil Login`,
        token
    })
}
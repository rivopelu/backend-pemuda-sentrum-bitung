const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/21/21104.png' },
    role: { type: String, default: 'user' }

})


module.exports = mongoose.model('User', userSchema);
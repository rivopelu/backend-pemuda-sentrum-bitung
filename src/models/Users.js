const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/21/21104.png' },

})


module.exports = mongoose.model('User', userSchema);
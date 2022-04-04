const mongoose = require('mongoose');
const crypto = require('crypto')
const schema = new mongoose.Schema({
    firstname: {
        type: String,
        required:true,
        maxlength: 100
    },
    lastname: {
        type: String,
        required:true,
        maxlength: 100
    },
    email: {
        type: String,
        required:true,
        maxlength: 100
    },
    phone: {
        type: String,
        default:null,
        maxlength: 20
    },
    address: {
        type: String,
        maxlength: 200
    },
    gender: {
        type: String,
        maxlength: 10
    },
    age: {
        type: Number
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    },
    is_admin: {
        type: Boolean,
        default:false
    }
})


schema.methods.setPassword = function(password) { 
    let user = this;
    user.salt = crypto.randomBytes(16).toString('hex'); 
    user.hash = crypto.pbkdf2Sync(password, user.salt,  
       1000, 64, `sha512`).toString(`hex`); 
};

schema.methods.validPassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 
module.exports.UserModel = mongoose.model('user',schema,'user')
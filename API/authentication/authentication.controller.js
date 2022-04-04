const { _throw400, _throw400Err, _throw500 } = require("../../services/errorHandler.service");
const { UserModel } =  require('../users/user.model');
const jwt = require('jsonwebtoken')
const { envconfig } =   require("../../_env");

exports.SIGNIN = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await UserModel.findOne({ email: email }).exec();
        if (!user) {
            return _throw400(res, 'No account found with the given email.')
        }
        if (!user.validPassword(password)) {
            return _throw400(res, 'Incorrect password.')
        }
        let response = JSON.parse(JSON.stringify(user))
        delete response['salt']
        delete response['hash']
        let session = {
            user: response,
            access_token: jwt.sign(JSON.parse(JSON.stringify(user)), envconfig.jwtscrt, {
                expiresIn: '7d'
            })
        }
        await user.save();
        res.json(session);

    } catch (error) {
        return _throw500(res, error)
    }
}
exports.SIGNUP = async (req, res) => {
    const { email, phone, password, firstname, lastname, address, age, gender } = req.body;
    let user = await UserModel.findOne({
        email: email
    }).exec();
    if (user) return _throw400(res, 'Account already exist with this email.');
    user = new UserModel();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.gender = gender;
    user.age = age;
    user.setPassword(password);
    try {
        await user.validate();
    } catch (error) {
        return _throw400Err(res, error)
    }

    let response = JSON.parse(JSON.stringify(user))
    delete response['salt']
    delete response['hash']
    delete response['activeSessions']
    let session = {
        user: response,
        access_token: jwt.sign(JSON.parse(JSON.stringify(user)), envconfig.jwtscrt, {
            expiresIn: '7d'
        })
    }
    await user.save();
    res.json(session);
}
exports.SIGNOUT = async (req, res) => {
    console.log(req.headers)
    res.json(req.headers.cookie)
}
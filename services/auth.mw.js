const {verify}  = require("jsonwebtoken");
const {envconfig} =  require("../_env");
const { _throw400, _throw401 } = require("./errorHandler.service");

exports.IsAuthenticated = (req,res,next)=>{
    if(!req.headers.authorization){
        return _throw401(res,'Authorization required !')
    }
    let access_token = req.headers.authorization.split(' ')[1]
    if(!access_token){
        return _throw400(res,'Acess token is required.')
    }
    try {
        let payload = verify(access_token,envconfig.jwtscrt);
        req.app.set('user',payload);
        next();
    } catch (error) {
        return res.status(401).send({
            invalid_access_token : 1
        })
    }
}

exports.IsAdmin = (req,res,next)=>{
    if(req.app.get('user').is_admin){
        next();
        return
    }
    _throw401(res,'User not allowed !')
}
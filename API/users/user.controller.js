const { _throw500, _throw400 } = require("../../services/errorHandler.service");
const { UserModel } = require("./user.model")
exports.GET_OWN_PROFILE = async (req,res)=>{
    let user = req.app.get('user');
    let details = await UserModel.findById(user._id).exec();
    res.json(details)
}
exports.UPDATE_OWN_PROFILE = async (req,res)=>{
    let userData = req.app.get('user')
    let body = req.body;

    try {
        let user = await UserModel.findById(userData._id).exec(); 
        if(body.password){
            user.setPassword(body.password);
        }
        body.firstname?(user.firstname = body.firstname):0;
        body.lastname?(user.lastname = body.lastname):0;
        body.email?(user.email = body.email):0;
        body.phone?(user.phone = body.phone):0;
        body.address?(user.address = body.address):0;
        body.gender?(user.gender = body.gender):0;
        body.age?(user.age = body.age):0;
        await user.save();
        res.json(user)
    } catch (error) {
        return _throw500(res,error)
    }
}
exports.GET_USER = async (req,res)=>{
    let query = {}
    if(req.query.id){
        query['_id'] = req.query.id;
    }
    try {
        let users = await UserModel.find(query).exec();
        res.json(users)
    } catch (error) {
        return _throw500(res,'Internal server error: User.find.')
    }
}
exports.ADD_USER = async (req, res) => {
    const { email, phone, password, firstname, lastname, address, age, gender, is_admin } = req.body;
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
    user.is_admin = is_admin
    user.setPassword(password);
    try {
        await user.validate();
    } catch (error) {
        return _throw400Err(res, error)
    }

    let response = JSON.parse(JSON.stringify(user))
    await user.save();
    res.json(response);
}
exports.UPDATE_USER = async (req,res)=>{
    if(!req.params.id){
        return _throw400(res,'user _id is required !')
    }
    let body = req.body;

    try {
        let user = await UserModel.findById(req.params.id).exec(); 
        if(body.password){
            user.setPassword(body.password);
        }
        body.firstname?(user.firstname = body.firstname):0;
        body.lastname?(user.lastname = body.lastname):0;
        body.email?(user.email = body.email):0;
        body.phone?(user.phone = body.phone):0;
        body.address?(user.address = body.address):0;
        body.gender?(user.gender = body.gender):0;
        body.age?(user.age = body.age):0;
        body.is_admin?(user.is_admin = body.is_admin):0;

        await user.save();
        res.json(user)
    } catch (error) {
        return _throw500(res,error)
    }
}
exports.DELETE_USER = (req,res)=>{
    if(!req.params.id){
        return _throw400(res,'user _id is required !')
    }
    UserModel.findByIdAndDelete(req.params.id).exec((err,re)=>{
        if(err){
            return _throw500(res,err)
        }
        return res.json(re)
    })
}
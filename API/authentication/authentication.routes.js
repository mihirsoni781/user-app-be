const { Router } = require("express") ;
const { IsAuthenticated } = require("../../services/auth.mw");
const { SIGNIN, SIGNOUT, SIGNUP } = require('./authentication.controller');

const router = Router();
    router.post('/signin',SIGNIN);
    router.post('/signup',SIGNUP);
    router.post('/signout',[SIGNOUT]);
    
module.exports.AuthRoutes = router;
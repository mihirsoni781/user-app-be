const { IsAdmin, IsAuthenticated } = require('../../services/auth.mw');
const { GET_USER, ADD_USER, DELETE_USER, UPDATE_USER, GET_OWN_PROFILE, UPDATE_OWN_PROFILE } = require('./user.controller');

const router = require('express').Router();
router.use("**",(req,res,next)=>{
    console.log(new Date().toString(),': ' ,req.originalUrl)
    next();
})
router.get('/me',[ IsAuthenticated ,GET_OWN_PROFILE])
router.patch('/me',[ IsAuthenticated ,UPDATE_OWN_PROFILE])
router.get('/',[ IsAuthenticated , IsAdmin ,GET_USER])
router.post('/',[IsAuthenticated , IsAdmin,ADD_USER])
router.delete('/:id',[IsAuthenticated , IsAdmin, DELETE_USER])
router.patch('/:id',[IsAuthenticated , IsAdmin, UPDATE_USER])
module.exports.UserRoutes = router;

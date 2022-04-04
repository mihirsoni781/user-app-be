const { AuthRoutes } = require('./API/authentication/authentication.routes');
const { UserRoutes } = require('./API/users/user.routes');

const router = require('express').Router();
router.use('/user',UserRoutes)
router.use('/auth',AuthRoutes)
module.exports.APIRoutes = router;
const bodyParser = require('body-parser');
const express = require('express');
const { APIRoutes } = require('./api.routes');
const { _throw404 } = require('./services/errorHandler.service');
const { createConnection } = require('./services/mongoose.service');
const { envconfig } = require('./_env');
createConnection(envconfig.db_srv);
const App = express();
const cors = require('cors')
App.use(cors());
App.use(express.urlencoded({extended:true}));
App.use(express.json());
App.use(bodyParser.json());
App.use('/api',APIRoutes);
App.get("**",(req,res)=>{
    return _throw404(res,'Page not found !')
})
App.listen(envconfig.port,()=>{
    console.log('Express server running on localhost:'+envconfig.port);
})
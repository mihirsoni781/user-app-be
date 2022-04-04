const mongoose = require("mongoose")

exports.createConnection = (database_srv)=>{
    mongoose.connect(database_srv,(err)=>{
        if(!err){
            return console.log('MongoDB connected successfully...')
        }
        console.log(err)
    })
}
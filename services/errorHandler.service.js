exports._throw500 = (res,error)=>{
    console.log('------------- INTERNAL SERVER ERROR 500 ----------------')
    console.log(error)
    res.status(500).send(error)
}
exports._throw400 = (res,error)=>{
    res.status(400).send({detail:error})
}
exports._throw404 = (res,error)=>{
    res.status(404).send({detail:error})
}
exports._throw400Err = (res,error)=>{
    res.status(400).send(error)
}
exports._throw406 = (res,error)=>{
    res.status(406).send(error)
}
exports._throw401 = (res,error)=>{
    res.status(401).send(error)
}
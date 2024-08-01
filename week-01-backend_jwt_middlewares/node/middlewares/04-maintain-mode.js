// a middleware that checks if the server is in maintain mode


let maintainmode=  process.env.maintainmode === 'true' || true


let express = require('express');
let app = express();


function maintainMiddleware(req, res, next) {
    if(maintainmode){
        return res.send('server is in maintain mode')
    }else{
        next()
    }
}

app.use(maintainMiddleware)
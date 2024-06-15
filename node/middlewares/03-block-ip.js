// a middleware that blocks a specific ip


let express = require('express');
let app = express();

let blockedIp = ['89.0.142.86', '89.0.142.86'];


app.use((req, res, next) => {
    
    if(blockedIp.includes(req.ip)){
       return res.send('blocked')
    }else{
        next()
    }
})

app.get('/', (req, res) => {
    res.send('hello you are not blocked')
 })
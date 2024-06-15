// basic rate limiting

const express = require('express');
const app = express();

let count = 0;

app.use((req,res,next)=>{
    count++
    console.log(req.ip);
    console.log(count);
    next()
})

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(3000)
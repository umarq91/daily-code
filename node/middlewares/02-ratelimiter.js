// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second
let express = require('express');
let app = express();


app.listen(3000)
// level 1 : rate limiter (5 requests total per user)

// let numberOfRequestsForUser = {}
// function rateLimiter(req, res, next) {
// // track the number of requests for each user

// const user = req.headers["user-id"]
//     if(!user){
//        return res.json({message:'user missing'})
//     }

//         if(!numberOfRequestsForUser[user]){
//             numberOfRequestsForUser[user] = 0
//         }

//         numberOfRequestsForUser[user]++

//         if(numberOfRequestsForUser[user]>5){
//        return res.status(404).json({ message: 'Too many requests' });
//         }

// next()
// }

// app.use(rateLimiter)


// one approach is to use SetIntal and clear numberOfRequestsForUser every second
// setInterval(() => {
//     numberOfRequestsForUser = {};
// }, 1000);




// second is to manually chec for request in last second / minute


// level 2 : rate limiter (10 requests total per minute)

let numberOfRequestsPerUser = {}


// rate limiter function that takes max 2 request per second
function rateLimiter(req, res, next){
    const user = req.headers["user-id"]
    if(!user){
       return res.json({message:'user missing'})
    }

    const now = Date.now()

        if(!numberOfRequestsPerUser[user]){
        numberOfRequestsPerUser[user] =[]
        }

        let userRequest =     numberOfRequestsPerUser[user].filter(time => now - time < 60000)
        console.log(userRequest);
    if(userRequest.length > 10){
      return  res.json({
            status:"fail",
            reason:"Too many request"
        })
    }
        numberOfRequestsPerUser[user].push(now)
    next()
    }

    app.use(rateLimiter)
app.use('/', (req, res) => {
    res.send('hello')
})
const express = require("express");
const userRoutes = require('./user')
const accountRoutes = require('./accounts')


const router = express.Router();


router.use('/user', userRoutes)
router.use('/account', accountRoutes)


module.exports = router
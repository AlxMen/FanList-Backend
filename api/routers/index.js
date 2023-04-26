const router = require("express").Router()

const users = require('./user.router.js')

router.use('/user', users)

module.exports = router
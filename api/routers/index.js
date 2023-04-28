const router = require("express").Router()

const users = require('./user.router.js')
const lists = require('./lista.router.js')

router.use('/user', users)
router.use('/list', lists)

module.exports = router
const router = require("express").Router()

const users = require('./user.router.js')
const lists = require('./lista.router.js')
const columns = require('./column.router.js')
const cards = require('./card.router.js')

router.use('/user', users)
router.use('/list', lists)
router.use('/column', columns)
router.use('/card', cards)

module.exports = router
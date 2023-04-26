const router = require("express").Router()

const {
  register,
} = require('../controllers/user.controller')

router.post('/', register)

module.exports = router
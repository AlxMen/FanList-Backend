const router = require("express").Router()

const {
  register,
  autenticar
} = require('../controllers/user.controller')

router.post('/', register)
router.post('/login', autenticar)

module.exports = router
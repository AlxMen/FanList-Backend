const router = require("express").Router()

const { checkAuth } = require('../middleware/checkAuth')

const {
  register,
  autenticar,
  confirmar,
  recuperar,
  comprobarToken,
  nuevoPassword,
  perfil
} = require('../controllers/user.controller')

router.post('/', register)
router.post('/login', autenticar)
router.get('/confirm/:token', confirmar)
router.post('/recover-password', recuperar)
router.route('/recover-password/:token').get(comprobarToken).post(nuevoPassword)
router.get('/perfil', checkAuth, perfil)

module.exports = router
const router = require("express").Router()

const {
  getListas,
  postLista,
  getLista,
  putLista,
  putListaColumn,
  putListaCard,
  deleteLista
} = require('../controllers/lista.controller')

const { checkAuth } = require('../middleware/checkAuth')

router.route('/').get(checkAuth, getListas).post(checkAuth, postLista)
router.get('/:id', checkAuth, getLista)
router.put('/lista/:id', checkAuth, putLista)
router.put('/column/:id', checkAuth, putListaColumn)
router.put('/card/:id', checkAuth, putListaCard)
router.delete('/:id', checkAuth, deleteLista)


module.exports = router
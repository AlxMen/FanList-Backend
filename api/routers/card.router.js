const router = require("express").Router()
const { checkAuth } = require('../middleware/checkAuth')

const {
  postCard,
  putCard,
  putCardColumn,
  deleteCard
} = require('../controllers/card.controller')

router.post('/', checkAuth, postCard)
router.route('/:id').put(checkAuth, putCard).delete(checkAuth, deleteCard)
router.put('/change/:id/:idcard', checkAuth, putCardColumn)

module.exports = router
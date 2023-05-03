const router = require("express").Router()
const { checkAuth } = require('../middleware/checkAuth')

const {
  postColumn,
  putColumn,
  deleteColumn
} = require('../controllers/column.controller')

router.post('/', checkAuth, postColumn)
router.route('/:id').put(checkAuth, putColumn).delete(checkAuth, deleteColumn)

module.exports = router
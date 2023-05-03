const List = require('../models/listas.model')
const Column = require('../models/column.model')

async function postColumn(req, res) {
  const { listowner } = req.body
  const existList = await List.findById(listowner)

  if (!existList) {
    const error = new Error("La lista no existe")
    return res.status(404).json({ msg: error.message })
  }

  if (existList.owner.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes los permisos para crear")
    return res.status(403).json({ msg: error.message })
  }

  try {
    const saveColumn = await Column.create(req.body)
    res.json(saveColumn)
  } catch (error) {
    console.log(error);
  }
}

async function putColumn(req, res) {
  const { id } = req.params

  const column = await Column.findById(id).populate("listowner")

  if (!column) {
    const error = new Error("La columna no existe")
    return res.status(404).json({ msg: error.message })
  }

  if (column.listowner.owner.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permisos para esta accion")
    return res.status(403).json({ msg: error.message })
  }

  column.name = req.body.name || column.name

  try {
    const updateColumn = await column.save()
    res.json(updateColumn)
  } catch (error) {
    console.log(error);
  }
}

async function deleteColumn(req, res) {
  const { id } = req.params

  const column = await Column.findById(id).populate("listowner")

  if (!column) {
    const error = new Error("La columna no existe")
    return res.status(404).json({ msg: error.message })
  }

  if (column.listowner.owner.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permisos para esta accion")
    return res.status(403).json({ msg: error.message })
  }

  try {
    await column.deleteOne()
    res.json({msg: 'columna eliminada'})
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  postColumn,
  putColumn,
  deleteColumn
}
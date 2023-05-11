const Column = require('../models/column.model')
const Card = require('../models/card.model')

async function postCard(req, res) {
  const { columnowner } = req.body
  const existColumn = await Column.findById(columnowner)

  if (!existColumn) {
    const error = new Error("La columna no existe")
    return res.status(404).json({ msg: error.message })
  }

  try {
    const saveCard = await Card.create(req.body)
    res.json(saveCard)
  } catch (error) {
    console.log(error);
  }
}

async function putCard(req, res) {
  const { id } = req.params

  const card = await Card.findById(id).populate("listowner")

  if (!card) {
    const error = new Error("La tarjeta no existe")
    return res.status(404).json({ msg: error.message })
  }

  if (card.listowner.owner.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permisos para esta accion")
    return res.status(403).json({ msg: error.message })
  }

  card.name = req.body.name || card.name
  card.description = req.body.description || card.description
  card.columnowner = req.body.columnowner || card.columnowner

  try {
    const updatecard = await card.save()
    res.json(updatecard)
  } catch (error) {
    console.log(error);
  }
}

async function deleteCard(req, res) {
  
  const { id } = req.params

  const card = await Card.findById(id).populate("listowner")

  if (!card) {
    const error = new Error("La tarjeta no existe")
    return res.status(404).json({ msg: error.message })
  }

  if (card.listowner.owner.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes permisos para esta accion")
    return res.status(403).json({ msg: error.message })
  }

  try {
    await card.deleteOne()
    res.json({msg: 'tarjeta eliminada'})
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  postCard,
  putCard,
  deleteCard
}
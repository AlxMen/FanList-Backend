const List = require('../models/listas.model')
const Column = require('../models/column.model')
const Card = require('../models/card.model')

async function getListas(req, res) {
  const lists = await List.find().where('owner').equals(req.user)
  res.json(lists)
}

async function postLista(req, res) {
  const newList = new List(req.body)
  newList.owner = req.user._id

  try {
    const saveList = await newList.save()
    res.json(saveList)
  } catch (error) {
    console.log(error);
  }
}

async function getLista(req, res) {

  const { id } = req.params
  const list = await List.findById(id)

  if (!list) {
    const error = new Error("No Encontrado")
    return res.status(404).json({ msg: error.message })
  }

  if (list.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Accion No Valida")
    return res.status(401).json({ msg: error.message })
  }
  
  const columns = await Column.find().where('listowner').equals(list._id)
  
  const cards = await Card.find().where('listowner').equals(list._id)

  res.json({
    list,
    columns,
    cards
  })
}

async function putLista(req, res) {
  const { id } = req.params
  const list = await List.findById(id)

  if (!list) {
    const error = new Error("No Encontrado")
    return res.status(404).json({ msg: error.message })
  }

  if (list.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Accion No Valida")
    return res.status(401).json({ msg: error.message })
  }

  list.name = req.body.name

  try {
    const updateList = await list.save()
    res.json(updateList)
  } catch (error) {
    console.log(error);
  }
}

async function deleteLista(req, res) {
  const { id } = req.params
  const list = await List.findById(id)

  if (!list) {
    const error = new Error("No Encontrado")
    return res.status(404).json({ msg: error.message })
  }

  if (list.owner.toString() !== req.user._id.toString()) {
    const error = new Error("Accion No Valida")
    return res.status(401).json({ msg: error.message })
  }

  try {
    await list.deleteOne();
    res.json({ msg: "Lista Eliminada" })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getListas,
  postLista,
  getLista,
  putLista,
  deleteLista
}
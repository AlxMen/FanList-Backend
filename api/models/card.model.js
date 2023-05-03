const mongoose = require("mongoose")

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String
  },
  columnowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Column"
  },
  listowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List"
  }
})

const card = mongoose.model("Card", cardSchema)
module.exports = card
const mongoose = require("mongoose")


const listaSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  columns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column'
    }
  ]
})

const Lista = mongoose.model("List", listaSchema)
module.exports = Lista
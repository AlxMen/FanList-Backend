const mongoose = require("mongoose")


const listaSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  columns: [{
    namecolumn: {
      type: String
    },
    cards: [{
      namecard: {
        type: String
      },
      description: {
        type: String
      }
    }]
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Lista = mongoose.model("List", listaSchema)
module.exports = Lista
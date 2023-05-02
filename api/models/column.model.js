const mongoose = require("mongoose")

const columnSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  listowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List"
  }
})

const column = mongoose.model("Column", columnSchema)
module.exports = column
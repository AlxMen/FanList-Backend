const mongoose = require("mongoose")
const hash = require('bcrypt')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  token: {
    type: String,
  },
  confirmation: {
    type: Boolean,
    default: false
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  const salt = await hash.genSalt(10)
  this.password = await hash.hash(this.password, salt)
})

userSchema.methods.confirmPassword = async function (passwordForm) {
  return await hash.compare(passwordForm, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User
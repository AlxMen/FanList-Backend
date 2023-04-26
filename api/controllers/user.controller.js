const User = require('../models/user.model') 

const {
  generarId
} = require('../helpers/generarId')

async function register(req, res) {

  const { email } = req.body
  const userExist = await User.findOne({ email })

  if (userExist) {
    const error = new Error("Usuario ya registrado")
    return res.status(400).json({ msg: error.message})
  }

  try {
    const usuario = new User(req.body)
    usuario.token = generarId()
    const userSave = await usuario.save() 
    res.json(userSave)
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  register
}
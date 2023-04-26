const User = require('../models/user.model')

const { generarId } = require('../helpers/generarId')
const { generarJWT } = require('../helpers/generarJWT')

async function register(req, res) {

  const { email } = req.body
  const userExist = await User.findOne({ email })

  if (userExist) {
    const error = new Error("Usuario ya registrado")
    return res.status(400).json({ msg: error.message })
  }

  try {
    const user = new User(req.body)
    user.token = generarId()
    const userSave = await user.save()
    res.json(userSave)
  } catch (error) {
    console.log(error);
  }
}

async function autenticar(req, res) {
  const { password, email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error("El usuario no existe")
    return res.status(404).json({ msg: error.message })
  }

  if (!user.confirmation) {
    const error = new Error("Tu cuenta no ha sido confirmada")
    return res.status(403).json({ msg: error.message })
  }

  if (!await user.confirmPassword(password)) {
    const error = new Error("La contraseña es incorrecta")
    return res.status(403).json({ msg: error.message })
  } else {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generarJWT(user._id)
    })
  }
}

module.exports = {
  register,
  autenticar
}
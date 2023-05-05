const User = require('../models/user.model')

const { generarId } = require('../helpers/generarId')
const { generarJWT } = require('../helpers/generarJWT')
const { emailRegistro, emailRecoveryPassword } = require('../helpers/email')

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
    await user.save()

    emailRegistro({
      email: user.email,
      name: user.name,
      token: user.token
    })

    res.json({msg: 'Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta'})
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

async function confirmar(req, res) {
  const { token } = req.params
  const userConfirm = await User.findOne({ token })
  if (!userConfirm) {
    const error = new Error("Token no valido")
    return res.status(403).json({ msg: error.message })
  }

  try {
    userConfirm.confirmation = true
    userConfirm.token = ''
    await userConfirm.save()
    res.json({ msg: 'Usuario Confirmado Correctamente' })
  } catch (error) {
    console.log(error);
  }
}

async function recuperar(req, res) {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    const error = new Error("El usuario no existe")
    return res.status(404).json({ msg: error.message })
  }

  try {
    user.token = generarId()
    await user.save()

    emailRecoveryPassword({
      email: user.email,
      name: user.name,
      token: user.token
    })
    res.json({ msg: "Se ha mandado un email con las instruciones" })
  } catch (error) {
    console.log(error);
  }
}

async function comprobarToken(req, res) {
  const { token } = req.params

  const tokenValido = await User.findOne({ token })
  if (tokenValido) {
    res.json({ msg: "Token valido y el Usuario existe" })
  } else {
    const error = new Error("Token no valido")
    return res.status(403).json({ msg: error.message })
  }

}

async function nuevoPassword(req, res) {
  const { token } = req.params
  const { password } = req.body

  const user = await User.findOne({ token })
  if (user) {
    user.password = password
    user.token = ''
    await user.save()
    res.json({ msg: "Contraseña cambiada" })
  } else {
    const error = new Error("Token no valido")
    return res.status(403).json({ msg: error.message })
  }
}

async function perfil(req, res) {
  const { user } = req

  res.json(user)
}

module.exports = {
  register,
  autenticar,
  confirmar,
  recuperar,
  comprobarToken,
  nuevoPassword,
  perfil
}
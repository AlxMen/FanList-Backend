const jwt = require('jsonwebtoken')
const User = require('../models/user.model')


async function checkAuth(req, res, next) {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.SECRET)
      req.user = await User.findById(decoded.id).select("-password -confrimation -token -__v")
      return next()
    } catch (error) {
      return res.status(404).json({msg:'Hubo un error'})
    }
  }

  if (!token) {
    const error = new Error("Token no valido")
    return res.status(401).json({ msg: error.message })
  }

  next()
}

module.exports = {
  checkAuth
}
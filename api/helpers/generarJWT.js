const jwt = require('jsonwebtoken')

function generarJWT(id) {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  generarJWT
}
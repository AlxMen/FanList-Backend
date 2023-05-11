const nodemailer = require('nodemailer')

async function emailRegistro(datos) {
  const { email, name, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const info = await transport.sendMail({
    from: '"FanList - Crea y personaliza tus listas" <fanlist@fanlist.com>',
    to: email,
    subject: "Confirmacion de Cuenta",
    text: "Confirmar tu cuenta en FanList",
    html: `
      <p>Hola: ${name} Bienvenido a FanList tu gestor de listas dinamica</p>
      <p>Tu cuenta esta ya casi lista, solo falta la confirmarla, por favor acceda al suiguente enlace para la verificacion: </p>
      
      <a href="${process.env.PORT_FRONT}/confirm/${token}">Verificar Cuenta</a>

      <p>Si tu no creastes esta cuenta, puedes ignorar el mensaje</p>
    `
  })
}

async function emailRecoveryPassword(datos) {
  const { email, name, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const info = await transport.sendMail({
    from: '"FanList - Crea y personaliza tus listas" <fanlist@fanlist.com>',
    to: email,
    subject: "Reestablecer Constraseña",
    text: "Cambiar contraseña olvidad",
    html: `
      <p>Hola: ${name} has solicitado reestablecer su contraseña de usuario</p>
      <p>Por favor sigua las siguinete enlace para crear su nueva contraseña: </p>
      
      <a href="${process.env.PORT_FRONT}/recovery-password/${token}">Nueva Contraseña</a>

      <p>Si tu no has solicitado reestablecer la contraseña, puedes ignorar el mensaje</p>
    `
  })
}


module.exports = {
  emailRegistro,
  emailRecoveryPassword
}
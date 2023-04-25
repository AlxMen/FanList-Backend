import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'

  ; (async function () {
    dotenv.config()
    try {
      await mongoose.connect(process.env.MONGO_URL || 'mongodb+srv://LawTeam:kRf122it7AjDwVPV@lawfirmdeploy.hdevwwz.mongodb.net/?retryWrites=true&w=majority', {
        dbName: process.env.MONGO_DB || 'fanlist2-db'
      })

      console.log('Connected to DB');
    } catch (err) {
      console.log(`Error connecting to DB: ${err}`)
    }
    try {

      const app = express()
        .use(cors())
        .use(morgan('combined'))
        .use(express.json())
        //.use('/api', require('./api/routes'))

      const PORT = process.env.PORT || 3000
      app.listen(PORT, (err) => {
        if (err) {
          console.log(err)
        }
        console.info('>'.repeat(40))
        console.info('💻  FanList Server')
        console.info(`📡  PORT: http://localhost:${PORT}`)
        console.info('>'.repeat(40) + '\n')
      })
    } catch (err) {
      console.log(err)
    }

  })()
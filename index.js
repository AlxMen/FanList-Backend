require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

  ; (async function () {
    
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
        .use('/api', require('./api/routers'))

      const PORT = process.env.PORT || 3000
      app.listen(PORT, (err) => {
        if (err) {
          console.log(err)
        }
        console.info('>'.repeat(40))
        console.info('💻  FanList Server')
        console.info(`📡  ${PORT}`)
        console.info('>'.repeat(40) + '\n')
      })
    } catch (err) {
      console.log(err)
    }

  })()
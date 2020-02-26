require('dotenv').config()
import express from 'express'
import { uri } from './config/db'
import mongoose from 'mongoose'
import routes from './routes'

const app = express()

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use(express.json())

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Conectado com sucesso no mongoDB')
    })
    .catch(err => {
        console.log('Erro ao conectar no mongoDB: ' + err)
    })

app.get('/', (req, res) => {
    res.send('teste')
})

app.use(routes)

app.listen(process.env.PORT || 5000)

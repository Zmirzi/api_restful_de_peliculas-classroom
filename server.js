import express from 'express'
import bodyParser from 'body-parser'
import rutaPeliculas from './routes/ruta-peliculas.js'
import jwt from 'jsonwebtoken'

const port = 3000
const app = express()
app.use(express.json())
app.use(bodyParser.json())

const secretKey = 'mi_clave_secreta'

const logger = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} en ${req.url}`)
    next()
}

app.use(logger)

app.use('/peliculas', rutaPeliculas)

app.listen(port, () => {
    console.log('Servicio iniciado en el puerto: ', port)
})
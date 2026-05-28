import express from 'express'
import bodyParser from 'body-parser'
import rutaPeliculas from './routes/ruta-peliculas.js'
import jwt from 'jsonwebtoken'
import db from './models/db.js'
import Pelicula from './models/model-peliculas.js'

const port = 3000
const app = express()
app.use(express.json())
app.use(bodyParser.json())

//Inicializacion asincrona de la base de datos
try {
    await db.authenticate();
    console.log('Conexion a la base de datos establecida')
    await db.sync();
} catch (error) {
    console.error('Error al conectar a la base de datos: ', error)
}

const secretKey = 'mi_clave_secreta'

const logger = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} - ${req.method} en ${req.url}`)
    next()
}

app.use(logger)

app.use('/peliculas', rutaPeliculas)

app.listen(process.env.PORT || port, () => console.log(`Servidor escuchando en el puerto ${port}`))
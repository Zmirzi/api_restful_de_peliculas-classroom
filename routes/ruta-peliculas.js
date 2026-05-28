import express from 'express'
import jwt from 'jsonwebtoken'
import service from '../services/serv-peliculas.js'

const router = express.Router()
const secretKey = 'mi_clave_secreta'

const validarApiKey = (req, res, next) => {
    const apiKey = req.query.key
    if (apiKey === '12345') {
        next()
    } else {
        res.status(403).send('Acceso Prohibido: API Key inválida')
    }
}

const validarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'No hay token' })
    }

    try {
        jwt.verify(token, secretKey)
        next()
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado' })
    }
}

router.use(validarToken)

router.get('/', validarApiKey, async (req, res) => {
    const data = await service.getAllPeliculas()
    res.send(data)
})

router.get('/:id', validarApiKey, async (req, res) => {
    const id = req.params.id
    const data = await service.getPeliculaById(id)
    res.send(data)
})

router.post('/', validarApiKey, async (req, res) => {
    const pelicula = req.body
    const nuevaPelicula = await service.createPelicula(pelicula)
    res.send(nuevaPelicula)
})

router.put('/:id', validarApiKey, async (req, res) => {
    const id = req.params.id
    const pelicula = req.body
    const peliculaActualizada = await service.updatePelicula(id, pelicula)
    res.send(peliculaActualizada)
})

router.delete('/:id', validarApiKey, async (req, res) => {
    const id = req.params.id
    const resultado = await service.deletePelicula(id)
    res.send(resultado)
})

//Generar el token
/* router.post('/login', (req, res) => {
    const { usuario, password } = req.body

    if (usuario === 'admin' && password === '1234') {
        const token = jwt.sign({ usuario }, secretKey, { expiresIn: '1h' })
        return res.json({ token })
    }

    return res.status(401).json({ error: 'Datos invalidos' })
}) */

export default router

import express from 'express'
import service from '../services/serv-peliculas.js'

const router = express.Router()

const validarApiKey = (req, res, next) => {
    const apiKey = req.query.key;
    if (apiKey === '12345') {
        next();
    } else {
        res.status(403).send('Acceso Prohibido: API Key inválida');
    }
}; 

router.get('/', validarApiKey, async (req, res) => {
    const data = await service.getAllPeliculas();
    res.send(data)
})

router.get('/:id', validarApiKey, async (req, res) => {
    const id = req.params.id;
    const data = await service.getPeliculaById(id);
    res.send(data)
})

router.post('/', validarApiKey, async (req, res) => {
    const pelicula = req.body;
    const nuevaPelicula = await service.createPelicula(pelicula);
    res.send(nuevaPelicula)
})

router.put('/:id', validarApiKey, async (req, res) => {
    const id = req.params.id;
    const pelicula = req.body;
    const peliculaActualizada = await service.updatePelicula(id, pelicula);
    res.send(peliculaActualizada)
})

router.delete('/:id', validarApiKey, async (req, res) => {
    const id = req.params.id;
    const resultado = await service.deletePelicula(id);
    res.send(resultado)
})

export default router
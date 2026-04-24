import Pelicula from '../models/model-peliculas.js'

async function getAllPeliculas() {
    const data = await Pelicula.findAll();
    return data;
}

async function getPeliculaById(id) {
    const data = await Pelicula.findByPk(id);
    return data;
}

async function createPelicula(pelicula) {
    const nuevaPelicula = await Pelicula.create(pelicula);
    return nuevaPelicula;
}

async function updatePelicula(id, pelicula) {
    const peliculaExistente = await Pelicula.findByPk(id);
    await peliculaExistente.update(pelicula);
    return peliculaExistente;
}

async function deletePelicula(id) {
    const peliculaExistente = await Pelicula.findByPk(id);
    await peliculaExistente.destroy();
    return { mensaje: 'Pelicula eliminada' };
}

export default { getAllPeliculas, getPeliculaById, createPelicula, updatePelicula, deletePelicula }
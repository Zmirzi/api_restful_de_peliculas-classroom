import db from './db.js'
import { DataTypes } from 'sequelize'

const Pelicula = db.define('Pelicula', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING
    },
    director: {
        type: DataTypes.STRING
    },
    costo: {
        type: DataTypes.DECIMAL
    },
    fechaEstreno: {
        type: DataTypes.STRING
    }
})

export default Pelicula
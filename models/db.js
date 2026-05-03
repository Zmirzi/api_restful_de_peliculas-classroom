import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'peliculas.sqlite'
})

async function init() {
    db.sync()
}

init()

export default db
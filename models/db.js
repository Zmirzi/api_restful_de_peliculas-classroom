import { Sequelize } from "sequelize";

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'creditos.sqlite'
})

async function init() {
    db.sync()
}

init()

export default db
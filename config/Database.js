import { Sequelize } from "sequelize";

const db = new Sequelize('proyek_3', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
});

export default db;
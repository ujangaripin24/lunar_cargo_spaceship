import { Sequelize } from "sequelize";

const db = new Sequelize('proyek_3', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
});

// const db = new Sequelize('proyek_3', 'necronomicon',  '123456789', {
//     host: "localhost",
//     dialect: "postgres",
// });

export default db;
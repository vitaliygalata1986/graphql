const Sequelize = require('sequelize')

const DB_NAME = 'todos'
const USER_NAME = 'root'
const PASSWORD = ''

// создадим объект sequelize:
 
const sequelize = new Sequelize(DB_NAME, USER_NAME, PASSWORD, { // проинициализируем базу данных
    // четвертым параметром передаем объект конфигурации:
    host: 'localhost',
    dialect: 'mysql' // для взаимодействия с mysql, хотя по умолчанию и так оно уже прописано
}) 

module.exports = sequelize

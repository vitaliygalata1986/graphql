const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const todo = sequelize.define('Todo',{ // название модели, которую хотим назвать
    // набор опций, которые хотим использовать
    id:{
        // задаем те значения, которые характерны для БД
        primaryKey: true, // данное поле идет с галочкой primaryKey
        autoIncrement: true, // чтобы данный id автоматически увеличивался
        allowNull: false, // запретим,чтобы данное поле было потенциально nulloм
        type: Sequelize.INTEGER // type берем с библиотеки Sequelize, и у него есть большое. кол. различных типов
    },
    done:{
        type: Sequelize.BOOLEAN, // true/false
        allowNull: false,
    },
    title: Sequelize.STRING, // можем и так написать, не обозначая другие параметры
    // date: {
    //     type: Sequelize.DATE, 
    //     allowNull: false
    // }
}) 
module.exports = todo
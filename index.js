const express = require('express')
const path = require('path')
const sequelize = require('./utils/database')
const todoRoutes = require('./routes/todo')
const app = express() // создаем объект appication, вызвав функцию express
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json()) // будет парсить все json файлы, которые потребуются

app.use('/api/todo', todoRoutes) // все запросы мы будем отсылать по api
// те запросы, у которых есть api - они будут служить для отдачи каких-либо данных - в нашем случае, это будет JSON
// после этого вставляем определенные роуты

app.use((req,res,next)=>{
    res.sendFile('/index.html')
})

async function start(){
    try{
        // await sequelize.sync({force:true}) // обращаемся к объекту sequelize, кот. на тек. момент уже полностью настроен для соед. с базой
        await sequelize.sync()
    }catch(e){
        console.log(e)
    }
}

start()
app.listen(PORT)
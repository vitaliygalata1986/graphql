const express = require('express')
const { join } = require('path')
const path = require('path')
const app = express() // создаем объект appication, вызвав функцию express
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))


app.use((req,res,next)=>{
    res.sendFile('/index.html')
})


app.listen(PORT)
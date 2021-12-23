const express = require('express')
const app = express() // создаем объект appication, вызвав функцию express
const PORT = process.env.PORT || 3000

app.listen(PORT)
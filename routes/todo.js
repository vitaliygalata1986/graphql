const {Router} = require('express') // импортируем роутер из express
const Todo = require('../models/todo')
const router = Router() // создадим роутер через функцию Router

// получение списка задач
router.get('/', (req, res)=>{
    res.json({a:1})
})

// создание какого-либо todo элемента
router.post('/', (req, res)=>{

})

// изменение какой-либо задачи, когда нажимаем на чекбокс, |будем принимать динамический id, чтобы понять, какой todo будем обрабатывать
router.put('/:id', (req, res)=>{

})

// удаление какой-либо задачи
router.delete('/:id', (req, res)=>{

})


module.exports = router
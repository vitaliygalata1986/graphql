const {Router} = require('express') // импортируем роутер из express
const Todo = require('../models/todo')
const router = Router() // создадим роутер через функцию Router

// получение списка задач
router.get('/', (req, res)=>{
    try{

    }catch(e){
        console.log(e)
        res.status(500).json({ // если есть ошибка, то будем отвечать
            message: 'Server Error'
        }) 
    }
})

// создание какого-либо todo элемента
router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create({ // обращаемся к модели и вызываем метод create или build+save
            // сюда будем передавать тайтл с фронтенда
            title: req.body.title,
            done: false, // по умолчанию у нас будет поле done в значении false
        })
        res.status(201).json({todo}) // по rest api - статус означает, что элемент был создан и дальше в json передадим объект todo
        // оборачиваем его в фигурные скобки, чтобы по ключу todo был доступен данный объект   
    }catch(e){
        console.log(e)
        res.status(500).json({ // если есть ошибка, то будем отвечать
            message: 'Server Error'
        }) 
    }
})

// изменение какой-либо задачи, когда нажимаем на чекбокс, |будем принимать динамический id, чтобы понять, какой todo будем обрабатывать
router.put('/:id', (req, res)=>{
    try{

    }catch(e){
        console.log(e)
        res.status(500).json({ // если есть ошибка, то будем отвечать
            message: 'Server Error'
        }) 
    }
})

// удаление какой-либо задачи
router.delete('/:id', (req, res)=>{
    try{

    }catch(e){
        console.log(e)
        res.status(500).json({ // если есть ошибка, то будем отвечать
            message: 'Server Error'
        }) 
    }
})


module.exports = router
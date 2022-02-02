const {Router} = require('express') // импортируем роутер из express
const Todo = require('../models/todo')
const router = Router() // создадим роутер через функцию Router

// получение списка задач
router.get('/', async(req, res)=>{
    try{
       const todos = await Todo.findAll() // обратимся к оператору await, чтобы обработать промисы. Метод findAll - выберит все элементы, которые относятся к данной модели Todo
        // данный метод верент нам промис и промис будет возвращать определенные данные, поэтому данные помещаем в массив todos
        // задаем статус 200
        res.status(200).json(todos) // в объекте json отдаем массив todos
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
router.put('/:id', async (req, res)=>{
    try{
        const todo = await Todo.findByPk(+req.params.id) // mongoose использовали findById.   pk - primary key - в нашем случае, это id. 
        // передаем id, так как нас интересует вот этот id: router.put('/:id'
        // на всякий случай добавим значек +, который приведет req.params.id - точно к числу, так как по-умолчанию, он будет считать, что это строка
        // так как он находится в строковом значении
        // после этого полю done пропишем:
        todo.done = req.body.done // будем с фронтенда указывать - на что поменять значение
        // после этого сохраним данный элемент
        await todo.save() // метод save - он такой же, как в mongose
        // дальше вернем статус 200
        res.status(200).json({todo}) // в объекте json просто вернем todo - чтобы его изменить на фронтенде
    }catch(e){
        console.log(e)
        res.status(500).json({ // если есть ошибка, то будем отвечать
            message: 'Server Error'
        }) 
    }
})

// удаление какой-либо задачи
router.delete('/:id', async(req, res)=>{
    try{
        // создадим массив todos:
        const todos = await Todo.findAll({
            // для того, чтобы обозначить, что нам нужно найти только определенный todo, у которого id совпадает с тем id, который мы сюда передаем, 
            // мы можем воспользоваться оператором where, который по сути также является объектом
            where:{
                // здесь указываем условие, по которому можно получить объект
                id: +req.params.id
            }
        })
        // далее нам нужно удалить этот элемент
        const todo = todos[0]
        await todo.destroy() // метод destroy - возвращает промис
        // после этого - нужно ответить клиенту, что все удалено и все хорошо
        res.status(204).json({}) // это означает, что контента нет, но при это все прошло успешно. В json() передаем пустой объект
    }catch(e){
        console.log(e)
        res.status(500).json({ // если есть ошибка, то будем отвечать
            message: 'Server Error'
        }) 
    }
})


module.exports = router
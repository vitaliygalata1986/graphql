// const { json } = require("express/lib/response")

  new Vue({
    el: '#app',
	//vuetify: new Vuetify(),
    data() {
      return {
        isDark: true,
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created(){ // хук, который вызывается в процессе инициализации проекта
      fetch('/api/todo',{
        method: 'get'
      })
      // после этого обрабатываем промис:
      .then(res=>res.json())
      .then(todos=> {  // будем получать объект todos
        // console.log(todos) // убидимся, что объект todos нам приходит
        this.todos = todos
      })
      .catch(e=>console.log(e))
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim()
        if (!title) {
          return
        }
        // this.todos.push({
        //   title: title,
        //   id: Math.random(),
        //   done: false,
        //   date: new Date()
        // })
        fetch('/api/todo', { // запрос и объект свойств
            method: 'post',// нам нужен метод post
            headers: {'Content-Type': 'application/json'}, // передаем заголовки
            body: JSON.stringify({title})// передаем объект body
        }) // нативная функция в клиентском JS
        // метод fetch отдает нам промис
        .then(res => res.json())
        .then(({todo}) => { // забираем объект todo
            // console.log(todo)
            // добавим в массив новый элемент todo
            this.todos.push(todo)
            // очистим todoTitle
            this.todoTitle = ''
        })
        .catch(e => console.log(e))
      },
      completeTodo(id){
        // console.log(id)
        fetch('/api/todo/' + id,{ // здесь еще нужен id, который принимаем в этой функции
          method:'put', // изменяет какие-либо элементы
          headers: {'Content-Type' : 'application/json'}, // хедеры мы описываем в том случае, еси=ли мы передаем что-то на сервер
          body: JSON.stringify({done: true})
        })
        .then(res=>res.json())
        .then(({todo})=>{ // здесь будем получать объект todo
          // на фронтенде сразу изменим этот todo:
          const idx = this.todos.findIndex(t=>t.id===todo.id)
          // после этого изменяем одно поле
          this.todos[idx].updatedAt = todo.updatedAt
        })
        .catch(e=>console.log(e))
      },  
      removeTodo(id) {
        fetch('/api/todo/' + id,{
          method:'delete'
        })
        // нам ненужно парсить ответ, так как контента у нас не будет
        .then(()=>{
          this.todos = this.todos.filter(t => t.id !== id) // отфильтруем массив todos, где не будет того элемента
        })
        .catch(e=>console.log(e))
    
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1)
      },
      date(value, withTime) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }
        if(withTime){
          options.hour = '2-digit'
          options.minute = '2-digit'
          options.second = '2-digit'
        }
        return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
      }
    }
  })
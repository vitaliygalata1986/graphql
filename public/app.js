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
      removeTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id)
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
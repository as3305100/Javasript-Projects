document.addEventListener('DOMContentLoaded', () => {

   const todoInput = document.getElementById("todo-input")
   const addTaskButton = document.getElementById("add-task-btn")
   const todoList = document.getElementById("todo-list")

   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

   tasks.forEach((task) => {
    renderTasks(task)
    // console.log(task)
   })

   addTaskButton.addEventListener('click', (e) => {
        const taskText = todoInput.value.trim()
        if (taskText === "") { 
            return alert("please enter a task")
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }

        tasks.push(newTask)
        saveTasks()
        renderTasks(newTask)

        todoInput.value = ""
       
   })

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  function renderTasks(task) {
            // console.log(task.text)
            // console.log(task.id)
            // console.log(task.completed)

            const li = document.createElement('li')
            li.setAttribute('data-id', task.id)
            // console.log(li)

            if(task.completed) li.classList.add('completed')
            li.innerHTML = `
            <span>${task.text}</span>
            <button>Delete</button>
            `;
            li.addEventListener('click', (e) => {
                if (e.target.tagName === 'BUTTON') {
                    return
                }
                task.completed = !task.completed
                // li.classList.toggle('completed') 
                if(task.completed) {
                    li.classList.add('completed')
                } else if(!task.completed) {
                    li.classList.remove('completed')
                }
                saveTasks()
            })

            todoList.addEventListener('click', (e) => {
                if(e.target.tagName === 'BUTTON') {
                    tasks = tasks.filter( (t) => {
                        return t.id !== task.id
                    })
                   
                     li.remove()
                    saveTasks()
                }
            })
            // li.querySelector('button').addEventListener('click', (e) => {
                // e.stopPropagation()
                // tasks = tasks.filter( (t) => {
                //   console.log(t.id)
                //   return t.id !== task.id
                    // })
                // console.log(tasks)

                // li.remove() 
                // saveTasks()
            // })

                 todoList.appendChild(li)
  }
          
})